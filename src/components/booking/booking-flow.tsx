"use client";
import * as React from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
  useWatch,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { bookingFormSchema as _schema } from "@/lib/booking-schema";

type BookingInput = z.input<typeof _schema>;
type BookingOutput = z.output<typeof _schema>;
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, ShieldCheck, Clock, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AvailabilityCalendar } from "@/components/site/availability-calendar";

import { bookingFormSchema } from "@/lib/booking-schema";
import { submitBooking } from "@/app/book/[tourSlug]/actions";

type BookingFormValues = BookingInput;
import { formatDateRange, formatUsd } from "@/lib/utils";
import type { DepartureAvailability } from "@/lib/types";
import { useT, useLocale, formatMessage } from "@/components/site/language-provider";

type BikeOption = {
  slug: string;
  brand: string;
  model: string;
  category: string;
  travelMm: number;
  wheelSize: string;
  dailyRateUsd: number;
  sizesAvail: string;
  riderHeightCm: string;
};

type Props = {
  tour: {
    slug: string;
    name: string;
    region: string;
    basePriceUsd: number;
    durationDays: number;
    maxGroup: number;
  };
  departures: DepartureAvailability[];
  bikes: BikeOption[];
  initialDepartureId?: string;
};

const emptyAccessories = {
  helmet: false,
  helmetSize: undefined,
  gloves: false,
  knePads: false,
  elbowPads: false,
  hydrationPack: false,
  mtbShoes: false,
  shoeSize: undefined,
  goPro: false,
};

const emptyRider = {
  name: "",
  heightCm: 175,
  weightKg: 75,
  experience: "INTERMEDIATE" as const,
  bikeSlug: "",
  frameSize: "recommend",
  accessories: emptyAccessories,
};

export function BookingFlow({ tour, departures, bikes, initialDepartureId }: Props) {
  const t = useT();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDep = initialDepartureId ?? searchParams.get("dep") ?? "";

  const form = useForm<BookingInput, unknown, BookingOutput>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      tourSlug: tour.slug,
      departureId: initialDep,
      leadName: "",
      email: "",
      phone: "",
      whatsapp: false,
      partySize: 1,
      riders: [{ ...emptyRider }],
      pickup: "",
      dietary: "",
      spanishHelp: false,
      emergencyName: "",
      emergencyPhone: "",
      hearAbout: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, getValues, trigger } = form;

  const phases = [
    t.booking.phases.dateParty,
    t.booking.phases.ridersGear,
    t.booking.phases.logisticsReview,
  ] as const;
  type PhaseIndex = 0 | 1 | 2;

  const [phaseIndex, setPhaseIndex] = React.useState<PhaseIndex>(0);
  const [submitState, setSubmitState] = React.useState<{
    pending: boolean;
    error?: string;
  }>({ pending: false });
  const [summaryOpen, setSummaryOpen] = React.useState(false);
  const [savedBanner, setSavedBanner] = React.useState(false);

  const storageKey = React.useMemo(() => `sierra-booking-${tour.slug}`, [tour.slug]);

  React.useEffect(() => {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const d = JSON.parse(raw) as Partial<BookingInput> & { tourSlug?: string };
      if (d.tourSlug !== tour.slug) return;
      const { tourSlug: _removed, ...rest } = d;
      void _removed;
      form.reset({ ...form.getValues(), ...rest } as BookingInput);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-shot restore
  }, [storageKey, tour.slug]);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      try {
        const v = getValues();
        sessionStorage.setItem(storageKey, JSON.stringify({ ...v, tourSlug: tour.slug }));
      } catch {
        /* ignore */
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [storageKey, tour.slug, getValues]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setSavedBanner(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const buildRiderFieldPaths = (
    keys: ReadonlyArray<
      "name" | "heightCm" | "weightKg" | "experience" | "bikeSlug" | "frameSize"
    >,
  ) => {
    const count = getValues("riders")?.length ?? 0;
    const paths: string[] = [];
    for (let i = 0; i < count; i++) {
      for (const k of keys) {
        paths.push(`riders.${i}.${k}`);
      }
    }
    return paths;
  };

  const partySize = useWatch({ control: form.control, name: "partySize" });
  React.useEffect(() => {
    const current = getValues("riders");
    const target = Math.max(1, Math.min(8, Number(partySize) || 1));
    if (current.length === target) return;
    if (current.length < target) {
      const additions = Array.from({ length: target - current.length }, () => ({
        ...emptyRider,
      }));
      form.setValue("riders", [...current, ...additions], { shouldValidate: false });
    } else {
      form.setValue("riders", current.slice(0, target), { shouldValidate: false });
    }
  }, [partySize, form, getValues]);

  const onSubmit = async (values: BookingOutput) => {
    setSubmitState({ pending: true });
    const res = await submitBooking(values);
    if (res.ok) {
      router.push(`/book/${tour.slug}/confirmation/${res.bookingId}`);
    } else {
      setSubmitState({ pending: false, error: res.error });
    }
  };

  const next = async () => {
    let fields: string[] = [];
    if (phaseIndex === 0) {
      if (!initialDep) fields.push("departureId");
      fields.push("leadName", "email", "phone", "partySize");
    } else if (phaseIndex === 1) {
      fields = [
        ...buildRiderFieldPaths(["name", "heightCm", "weightKg", "experience"]),
        ...buildRiderFieldPaths(["bikeSlug", "frameSize"]),
      ];
    }
    const ok = await trigger(fields as Parameters<typeof trigger>[0]);
    if (!ok) return;
    setPhaseIndex((p) => (Math.min(2, p + 1) as PhaseIndex));
  };

  const back = () =>
    setPhaseIndex((p) => (Math.max(0, p - 1) as PhaseIndex));

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-10 pb-24 lg:pb-0">
        {savedBanner && (
          <div className="lg:col-span-12 -mb-4 rounded-lg bg-[var(--color-agave)]/15 text-[var(--color-pine)] text-sm px-4 py-2 text-center">
            {t.booking.savedBanner}
          </div>
        )}

        <div className="lg:col-span-8 order-2 lg:order-1">
          <MobileEstimateBar
            open={summaryOpen}
            onOpenChange={setSummaryOpen}
            tour={tour}
            departures={departures}
            bikes={bikes}
          />
          <ul className="flex flex-wrap gap-2 mb-4 list-none p-0 m-0" aria-hidden>
            {(
              [
                t.booking.formProgress.phase0,
                t.booking.formProgress.phase1,
                t.booking.formProgress.phase2,
              ] as const
            ).map((label, i) => (
              <li
                key={label}
                className={`rounded-full px-3 py-1 text-xs font-medium border ${
                  i === phaseIndex
                    ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta-deep)]"
                    : "border-[var(--color-pine)]/15 text-[var(--color-ink-muted)]"
                }`}
              >
                {label}
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-6 max-w-2xl">
            {t.booking.phaseIntros[phaseIndex]}
          </p>
          <Stepper current={phaseIndex} phases={phases} ariaLabel={t.booking.stepperAria} />

          <div className="mt-8 bg-white rounded-3xl border border-[var(--color-pine)]/10 p-6 md:p-10">
            {phaseIndex === 0 && (
              <>
                {!initialDep && <DateStep tour={tour} departures={departures} />}
                <div className={initialDep ? "" : "mt-12 pt-10 border-t border-[var(--color-pine)]/10"}>
                  <TripBasicsStep maxGroup={tour.maxGroup} />
                </div>
              </>
            )}
            {phaseIndex === 1 && (
              <>
                <RidersStep />
                <div className="mt-14 pt-12 border-t border-[var(--color-pine)]/10">
                  <EquipmentStep bikes={bikes} tour={tour} locale={locale} />
                </div>
              </>
            )}
            {phaseIndex === 2 && (
              <>
                <LogisticsStep />
                <div className="mt-14 pt-12 border-t border-[var(--color-pine)]/10">
                  <ReviewStep tour={tour} departures={departures} bikes={bikes} locale={locale} />
                </div>
                <div className="mt-10 flex flex-wrap gap-4 text-xs text-[var(--color-ink-soft)]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[var(--color-agave-deep)] shrink-0" />
                    {t.booking.trustFreeCancel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[var(--color-agave-deep)] shrink-0" />
                    {t.booking.trustHandConfirmed}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-[var(--color-agave-deep)] shrink-0" />
                    {t.booking.trustNoCharge}
                  </span>
                </div>
              </>
            )}
          </div>

          {submitState.error && (
            <p
              role="alert"
              aria-live="assertive"
              className="mt-4 text-sm text-[var(--color-terracotta-deep)] bg-[var(--color-terracotta)]/10 px-4 py-3 rounded-md"
            >
              {submitState.error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={back}
              disabled={phaseIndex === 0}
            >
              <ArrowLeft className="h-4 w-4" /> {t.booking.back}
            </Button>
            {phaseIndex === 2 ? (
              <Button
                type="submit"
                size="lg"
                disabled={submitState.pending}
                aria-busy={submitState.pending || undefined}
                aria-live="polite"
                className="flex-col h-auto py-3 gap-0.5"
              >
                {submitState.pending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{" "}
                    {t.booking.sending}
                  </span>
                ) : (
                  <>
                    <span>{t.booking.holdSpot}</span>
                    <span className="text-xs font-normal opacity-90">
                      {t.booking.holdSpotSub}
                    </span>
                  </>
                )}
              </Button>
            ) : (
              <Button type="button" onClick={next} size="lg">
                {t.booking.next} <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <aside className="lg:col-span-4 order-1 lg:order-2">
          <div className="hidden lg:block">
            <Summary tour={tour} departures={departures} bikes={bikes} locale={locale} />
          </div>
        </aside>
      </form>
    </FormProvider>
  );
}

function MobileEstimateBar({
  open,
  onOpenChange,
  tour,
  departures,
  bikes,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tour: Props["tour"];
  departures: DepartureAvailability[];
  bikes: BikeOption[];
}) {
  const t = useT();
  const locale = useLocale();
  const values = useWatch<BookingFormValues>();
  const baseTotal = tour.basePriceUsd * (values?.partySize || 0);
  const bikeTotal = (values?.riders || []).reduce((sum, r) => {
    const bike = bikes.find((b) => b.slug === r?.bikeSlug);
    if (!bike) return sum;
    return sum + bike.dailyRateUsd * tour.durationDays;
  }, 0);
  const accessoriesTotal = (values?.riders || []).reduce((sum, r) => {
    const a = r?.accessories || {};
    let s = 0;
    if (a.gloves) s += 5 * tour.durationDays;
    if (a.knePads) s += 8 * tour.durationDays;
    if (a.elbowPads) s += 8 * tour.durationDays;
    if (a.hydrationPack) s += 5 * tour.durationDays;
    if (a.mtbShoes) s += 12 * tour.durationDays;
    if (a.goPro) s += 10;
    return sum + s;
  }, 0);
  const total = baseTotal + bikeTotal + accessoriesTotal;

  return (
    <>
      <div className="lg:hidden sticky top-14 z-20 -mx-1 mb-4">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-[var(--color-pine)]/15 bg-white px-4 py-2.5 text-sm shadow-sm"
          onClick={() => onOpenChange(true)}
        >
          <span className="text-[var(--color-ink-muted)]">{t.booking.estimateTap}</span>
          <span className="font-serif text-lg">{formatUsd(total, locale)}</span>
        </button>
      </div>
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/45 p-4 flex items-end justify-center"
          onClick={() => onOpenChange(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-lg max-h-[75vh] overflow-y-auto rounded-t-2xl bg-[var(--color-sand-soft)] shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t.booking.summary.heading}
          >
            <div className="p-4">
              <Summary tour={tour} departures={departures} bikes={bikes} locale={locale} />
            </div>
            <Button
              type="button"
              variant="ghost"
              className="w-full rounded-none border-t border-[var(--color-pine)]/10"
              onClick={() => onOpenChange(false)}
            >
              {t.booking.close}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Stepper({
  current,
  phases,
  ariaLabel,
}: {
  current: number;
  phases: readonly string[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className="flex flex-wrap gap-x-3 gap-y-2 text-xs uppercase tracking-wider">
        {phases.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-2 ${
              i === current
                ? "text-[var(--color-terracotta)] font-medium"
                : i < current
                  ? "text-[var(--color-pine)]"
                  : "text-[var(--color-ink-muted)]"
            }`}
          >
            <span
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
                i === current
                  ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)] text-white"
                  : i < current
                    ? "border-[var(--color-pine)] bg-[var(--color-pine)] text-[var(--color-sand-soft)]"
                    : "border-[var(--color-pine)]/20"
              }`}
            >
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function DateStep({
  tour,
  departures,
}: {
  tour: Props["tour"];
  departures: DepartureAvailability[];
}) {
  const t = useT();
  const { control } = useFormContext<BookingFormValues>();
  return (
    <div>
      <h2 className="font-serif text-3xl">{t.booking.dateStep.title}</h2>
      <p className="mt-2 text-[var(--color-ink-soft)]">
        {t.booking.dateStep.intro}
      </p>
      <p className="mt-2 text-xs text-[var(--color-ink-muted)] leading-relaxed max-w-2xl">
        {t.booking.whyWeAsk.departure}
      </p>
      <div className="mt-8">
        <Controller
          control={control}
          name="departureId"
          render={({ field, fieldState }) => (
            <>
              <AvailabilityCalendar
                tourSlug={tour.slug}
                basePriceUsd={tour.basePriceUsd}
                departures={departures}
                selectedDepartureId={field.value || undefined}
                onSelect={(id) => field.onChange(id)}
              />
              {fieldState.error && (
                <p className="mt-3 text-sm text-[var(--color-terracotta-deep)]">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}

function TripBasicsStep({ maxGroup }: { maxGroup: number }) {
  const t = useT();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<BookingFormValues>();
  return (
    <div>
      <h2 className="font-serif text-3xl">{t.booking.basicsStep.title}</h2>
      <p className="mt-2 text-[var(--color-ink-soft)]">
        {t.booking.basicsStep.intro}
      </p>
      <p className="mt-2 text-xs text-[var(--color-ink-muted)] leading-relaxed max-w-2xl">
        {t.booking.whyWeAsk.leadContact}
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label={t.booking.basicsStep.yourName} error={errors.leadName?.message}>
          <Input {...register("leadName")} placeholder="Anais Hernández" />
        </Field>
        <Field label={t.booking.basicsStep.email} error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="anais@example.com" />
        </Field>
        <Field label={t.booking.basicsStep.phone} error={errors.phone?.message}>
          <Input {...register("phone")} placeholder="+52 33 1234 5678" />
        </Field>
        <Field
          label={t.booking.basicsStep.partySize.replace("{max}", String(maxGroup))}
          error={errors.partySize?.message}
        >
          <Input
            type="number"
            min={1}
            max={maxGroup}
            {...register("partySize", { valueAsNumber: true })}
          />
        </Field>
      </div>
      <div className="mt-5">
        <Controller
          control={control}
          name="whatsapp"
          render={({ field }) => (
            <label className="inline-flex items-center gap-3 text-sm">
              <Checkbox
                checked={field.value}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
              />
              <span>{t.booking.basicsStep.whatsapp}</span>
            </label>
          )}
        />
      </div>
    </div>
  );
}

function RidersStep() {
  const t = useT();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<BookingFormValues>();
  const { fields } = useFieldArray({ control, name: "riders" });
  return (
    <div>
      <h2 className="font-serif text-3xl">{t.booking.ridersStep.title}</h2>
      <p className="mt-2 text-[var(--color-ink-soft)]">
        {t.booking.ridersStep.intro}
      </p>
      <p className="mt-2 text-xs text-[var(--color-ink-muted)] leading-relaxed max-w-2xl">
        {t.booking.whyWeAsk.riders}
      </p>
      <div className="mt-8 space-y-8">
        {fields.map((f, idx) => (
          <div
            key={f.id}
            className="rounded-2xl border border-[var(--color-pine)]/10 p-5 md:p-6 bg-[var(--color-sand-soft)]"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta)]">
              {t.booking.ridersStep.riderLabel.replace("{n}", String(idx + 1))}
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Field label={t.booking.ridersStep.name} error={errors.riders?.[idx]?.name?.message}>
                <Input {...register(`riders.${idx}.name`)} />
              </Field>
              <Field
                label={t.booking.ridersStep.experience}
                error={errors.riders?.[idx]?.experience?.message}
              >
                {({ id, describedBy, invalid }) => (
                  <Controller
                    control={control}
                    name={`riders.${idx}.experience`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id={id}
                          aria-describedby={describedBy}
                          aria-invalid={invalid || undefined}
                        >
                          <SelectValue placeholder={t.booking.ridersStep.experiencePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BEGINNER">{t.booking.ridersStep.beginner}</SelectItem>
                          <SelectItem value="INTERMEDIATE">{t.booking.ridersStep.intermediate}</SelectItem>
                          <SelectItem value="ADVANCED">{t.booking.ridersStep.advanced}</SelectItem>
                          <SelectItem value="EXPERT">{t.booking.ridersStep.expert}</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
              </Field>
              <Field label={t.booking.ridersStep.heightCm} error={errors.riders?.[idx]?.heightCm?.message}>
                <Input
                  type="number"
                  min={120}
                  max={220}
                  {...register(`riders.${idx}.heightCm`, { valueAsNumber: true })}
                />
              </Field>
              <Field label={t.booking.ridersStep.weightKg} error={errors.riders?.[idx]?.weightKg?.message}>
                <Input
                  type="number"
                  min={35}
                  max={180}
                  {...register(`riders.${idx}.weightKg`, { valueAsNumber: true })}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EquipmentStep({
  bikes,
  tour,
  locale,
}: {
  bikes: BikeOption[];
  tour: Props["tour"];
  locale: string;
}) {
  const t = useT();
  const { control } = useFormContext<BookingFormValues>();
  const { fields } = useFieldArray({ control, name: "riders" });
  return (
    <div>
      <h2 className="font-serif text-3xl">{t.booking.equipmentStep.title}</h2>
      <p className="mt-2 text-[var(--color-ink-soft)]">
        {t.booking.equipmentStep.intro}
      </p>
      <p className="mt-2 text-xs text-[var(--color-ink-muted)] leading-relaxed max-w-2xl">
        {t.booking.whyWeAsk.bikes}
      </p>
      <div className="mt-8 space-y-8">
        {fields.map((f, idx) => (
          <div
            key={f.id}
            className="rounded-2xl border border-[var(--color-pine)]/10 p-5 md:p-6 bg-[var(--color-sand-soft)]"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta)]">
              {t.booking.ridersStep.riderLabel.replace("{n}", String(idx + 1))}
            </p>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Field label={t.booking.equipmentStep.bikeLabel}>
                {({ id, describedBy }) => (
                  <Controller
                    control={control}
                    name={`riders.${idx}.bikeSlug`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id={id} aria-describedby={describedBy}>
                          <SelectValue placeholder={t.booking.equipmentStep.pickBike} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="byo">{t.booking.equipmentStep.bringingOwn}</SelectItem>
                          {bikes.map((b) => (
                            <SelectItem key={b.slug} value={b.slug}>
                              {b.brand} {b.model} — {formatUsd(b.dailyRateUsd, locale)}/day
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
              </Field>
              <Field label={t.booking.equipmentStep.frameSizeLabel}>
                {({ id, describedBy }) => (
                  <Controller
                    control={control}
                    name={`riders.${idx}.frameSize`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id={id} aria-describedby={describedBy}>
                          <SelectValue placeholder={t.booking.equipmentStep.recommendSize} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recommend">{t.booking.equipmentStep.recommendSize}</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
              </Field>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-3">{t.booking.equipmentStep.accessoriesLabel}</p>
              <AccessoryCheckboxes idx={idx} tour={tour} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccessoryCheckboxes({ idx, tour }: { idx: number; tour: Props["tour"] }) {
  const t = useT();
  const { control } = useFormContext<BookingFormValues>();
  const accessoryItems: { name: keyof BookingFormValues["riders"][number]["accessories"]; label: string }[] = [
    { name: "helmet", label: t.booking.equipmentStep.accessories.helmet },
    { name: "gloves", label: t.booking.equipmentStep.accessories.gloves },
    { name: "knePads", label: t.booking.equipmentStep.accessories.kneePads },
    { name: "elbowPads", label: t.booking.equipmentStep.accessories.elbowPads },
    { name: "hydrationPack", label: t.booking.equipmentStep.accessories.hydrationPack },
    { name: "mtbShoes", label: t.booking.equipmentStep.accessories.mtbShoes },
    { name: "goPro", label: t.booking.equipmentStep.accessories.goPro },
  ];
  void tour;
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {accessoryItems.map((a) => (
        <Controller
          key={a.name}
          control={control}
          name={`riders.${idx}.accessories.${a.name}`}
          render={({ field }) => (
            <label className="flex items-center gap-3 text-sm py-1.5">
              <Checkbox
                checked={Boolean(field.value)}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
              />
              <span>{a.label}</span>
            </label>
          )}
        />
      ))}
    </div>
  );
}

function LogisticsStep() {
  const t = useT();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<BookingFormValues>();
  return (
    <div>
      <h2 className="font-serif text-3xl">{t.booking.logisticsStep.title}</h2>
      <p className="mt-2 text-[var(--color-ink-soft)]">
        {t.booking.logisticsStep.intro}
      </p>
      <div className="mt-8 grid gap-5">
        <div>
          <Field
            label={t.booking.logisticsStep.pickupLabel}
            error={errors.pickup?.message}
            help={t.booking.logisticsStep.pickupHelp}
          >
            <Input
              {...register("pickup")}
              placeholder={t.booking.logisticsStep.pickupPlaceholder}
            />
          </Field>
          <p className="mt-2 text-xs text-[var(--color-ink-muted)] leading-relaxed">
            {t.booking.logisticsStep.whyPickups}
          </p>
        </div>

        <Field label={t.booking.logisticsStep.dietaryLabel} error={errors.dietary?.message}>
          <Input {...register("dietary")} placeholder={t.booking.logisticsStep.dietaryPlaceholder} />
        </Field>

        <Controller
          control={control}
          name="spanishHelp"
          render={({ field }) => (
            <label className="inline-flex items-center gap-3 text-sm">
              <Checkbox
                checked={field.value}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
              />
              <span>{t.booking.logisticsStep.spanishHelp}</span>
            </label>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <p className="sm:col-span-2 text-xs text-[var(--color-ink-muted)] leading-relaxed -mb-2">
            {t.booking.logisticsStep.whyEmergency}
          </p>
          <Field label={t.booking.logisticsStep.emergencyName} error={errors.emergencyName?.message}>
            <Input {...register("emergencyName")} />
          </Field>
          <Field label={t.booking.logisticsStep.emergencyPhone} error={errors.emergencyPhone?.message}>
            <Input {...register("emergencyPhone")} />
          </Field>
        </div>

        <Field label={t.booking.logisticsStep.hearAbout}>
          {({ labelId }) => (
            <Controller
              control={control}
              name="hearAbout"
              render={({ field }) => (
                <RadioGroup
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  aria-labelledby={labelId}
                  className="grid sm:grid-cols-3 gap-2"
                >
                  {t.booking.logisticsStep.hearAboutOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-sm rounded-md border border-[var(--color-pine)]/15 px-3 py-2 hover:bg-[var(--color-sand)] cursor-pointer"
                    >
                      <RadioGroupItem value={opt} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </RadioGroup>
              )}
            />
          )}
        </Field>

        <Field label={t.booking.logisticsStep.notesLabel}>
          <Textarea
            {...register("notes")}
            placeholder={t.booking.logisticsStep.notesPlaceholder}
          />
        </Field>
      </div>
    </div>
  );
}

function ReviewStep({
  tour,
  departures,
  bikes,
  locale,
}: {
  tour: Props["tour"];
  departures: DepartureAvailability[];
  bikes: BikeOption[];
  locale: string;
}) {
  const t = useT();
  const values = useWatch<BookingFormValues>();
  const dep = departures.find((d) => d.id === values.departureId);
  const v = values as BookingFormValues;
  const riderWord = (n: number) =>
    n === 1 ? t.booking.reviewStep.riderCount.replace("{n}", String(n))
             : t.booking.reviewStep.riderCountMany.replace("{n}", String(n));

  return (
    <div>
      <h2 className="font-serif text-3xl">{t.booking.reviewStep.title}</h2>
      <p className="mt-2 text-[var(--color-ink-soft)]">
        {t.booking.reviewStep.intro}
      </p>

      <div className="mt-6 rounded-xl border border-[var(--color-pine)]/10 bg-[var(--color-agave)]/10 p-5 md:p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
          {t.booking.reviewStep.whatNextTitle}
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
          {t.booking.reviewWhatNext}
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        <ReviewBlock title={t.booking.reviewStep.blockTourDate}>
          <p className="font-serif text-xl">{tour.name}</p>
          <p className="text-sm text-[var(--color-ink-soft)]">{tour.region}</p>
          {dep && (
            <p className="mt-2 text-sm">
              {formatDateRange(new Date(dep.startDate), new Date(dep.endDate), locale)}{" "}
              · {riderWord(v.partySize as number)}
            </p>
          )}
        </ReviewBlock>
        <ReviewBlock title={t.booking.reviewStep.blockLeadContact}>
          <p className="text-sm">
            {v.leadName} · {v.email} · {v.phone}
            {v.whatsapp ? " · WhatsApp" : ""}
          </p>
        </ReviewBlock>
        <ReviewBlock title={t.booking.reviewStep.blockRiders}>
          <ul className="text-sm space-y-3">
            {v.riders?.map((r, i) => {
              const bike = bikes.find((b) => b.slug === r.bikeSlug);
              const accessories = Object.entries(r.accessories || {})
                .filter(([k, val]) => val === true && k !== "helmetSize" && k !== "shoeSize")
                .map(([k]) => k);
              const riderName = r.name || t.booking.reviewStep.riderNoName;
              return (
                <li key={i} className="border-l-2 border-[var(--color-terracotta)]/40 pl-3">
                  <p className="font-medium">
                    {formatMessage(t.booking.reviewStep.riderLabel, { n: i + 1, name: riderName })}
                  </p>
                  <p className="text-[var(--color-ink-soft)]">
                    {r.heightCm} cm · {r.weightKg} kg ·{" "}
                    {r.experience.toLowerCase()}
                  </p>
                  <p className="text-[var(--color-ink-soft)]">
                    {r.bikeSlug === "byo"
                      ? t.booking.reviewStep.bringingOwn
                      : bike
                        ? `${bike.brand} ${bike.model} (${r.frameSize})`
                        : t.booking.reviewStep.riderNoName}
                  </p>
                  {accessories.length > 0 && (
                    <p className="text-[var(--color-ink-soft)]">
                      {t.booking.reviewStep.addOns} {accessories.join(", ")}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </ReviewBlock>
        <ReviewBlock title={t.booking.reviewStep.blockLogistics}>
          <p className="text-sm">{t.booking.reviewStep.pickup.replace("{v}", v.pickup || "—")}</p>
          {v.dietary && (
            <p className="text-sm">{t.booking.reviewStep.dietary.replace("{v}", v.dietary)}</p>
          )}
          {v.spanishHelp && (
            <p className="text-sm">{t.booking.reviewStep.spanishGuide}</p>
          )}
          <p className="text-sm">
            {formatMessage(t.booking.reviewStep.emergency, {
              name: v.emergencyName || "—",
              phone: v.emergencyPhone || "—",
            })}
          </p>
          {v.notes && (
            <p className="text-sm mt-2">{t.booking.reviewStep.notes.replace("{v}", v.notes)}</p>
          )}
        </ReviewBlock>
      </div>
    </div>
  );
}

function ReviewBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-pine)]/10 p-5 bg-[var(--color-sand-soft)]">
      <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Summary({
  tour,
  departures,
  bikes,
  locale,
}: {
  tour: Props["tour"];
  departures: DepartureAvailability[];
  bikes: BikeOption[];
  locale: string;
}) {
  const t = useT();
  const values = useWatch<BookingFormValues>();
  const dep = departures.find((d) => d.id === values?.departureId);

  const baseTotal = tour.basePriceUsd * (values?.partySize || 0);
  const bikeTotal = (values?.riders || []).reduce((sum, r) => {
    const bike = bikes.find((b) => b.slug === r?.bikeSlug);
    if (!bike) return sum;
    return sum + bike.dailyRateUsd * tour.durationDays;
  }, 0);
  const accessoriesTotal = (values?.riders || []).reduce((sum, r) => {
    const a = r?.accessories || {};
    let s = 0;
    if (a.gloves) s += 5 * tour.durationDays;
    if (a.knePads) s += 8 * tour.durationDays;
    if (a.elbowPads) s += 8 * tour.durationDays;
    if (a.hydrationPack) s += 5 * tour.durationDays;
    if (a.mtbShoes) s += 12 * tour.durationDays;
    if (a.goPro) s += 10;
    return sum + s;
  }, 0);
  const total = baseTotal + bikeTotal + accessoriesTotal;

  return (
    <div className="sticky top-20 bg-white rounded-2xl border border-[var(--color-pine)]/10 p-6">
      <p className="text-xs uppercase tracking-wide text-[var(--color-terracotta)]">
        {t.booking.summary.heading}
      </p>
      <p className="mt-2 font-serif text-xl">{tour.name}</p>
      <p className="text-sm text-[var(--color-ink-soft)]">{tour.region}</p>
      {dep ? (
        <div className="mt-3">
          <Badge variant="agave">
            {formatDateRange(new Date(dep.startDate), new Date(dep.endDate), locale)}
          </Badge>
        </div>
      ) : (
        <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
          {t.booking.summary.noDate}
        </p>
      )}

      <dl className="mt-6 space-y-2 text-sm border-t border-[var(--color-pine)]/10 pt-5">
        <Line
          label={t.booking.summary.tourLine.replace("{n}", String(values?.partySize || 0))}
          value={formatUsd(baseTotal, locale)}
        />
        <Line label={t.booking.summary.bikeRentals} value={formatUsd(bikeTotal, locale)} />
        <Line label={t.booking.summary.accessories} value={formatUsd(accessoriesTotal, locale)} />
        <div className="pt-3 border-t border-[var(--color-pine)]/10 flex items-baseline justify-between">
          <span className="font-medium">{t.booking.summary.estimatedTotal}</span>
          <span className="font-serif text-2xl">{formatUsd(total, locale)}</span>
        </div>
      </dl>
      <p className="mt-4 text-xs text-[var(--color-ink-muted)] leading-relaxed">
        {t.booking.summary.disclaimer}
      </p>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[var(--color-ink-soft)]">{label}</span>
      <span>{value}</span>
    </div>
  );
}

type FieldA11y = {
  id: string;
  labelId: string;
  describedBy: string | undefined;
  invalid: boolean;
};

function Field({
  label,
  error,
  help,
  children,
}: {
  label: string;
  error?: string;
  help?: string;
  children: React.ReactNode | ((a11y: FieldA11y) => React.ReactNode);
}) {
  const id = React.useId();
  const labelId = `${id}-label`;
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const a11y: FieldA11y = { id, labelId, describedBy, invalid };

  let rendered: React.ReactNode;
  if (typeof children === "function") {
    rendered = (children as (a: FieldA11y) => React.ReactNode)(a11y);
  } else if (React.isValidElement(children)) {
    rendered = React.cloneElement(
      children as React.ReactElement<{
        id?: string;
        "aria-describedby"?: string;
        "aria-invalid"?: boolean;
      }>,
      {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": invalid ? true : undefined,
      },
    );
  } else {
    rendered = children;
  }

  return (
    <div>
      <Label id={labelId} htmlFor={id} className="block mb-1.5">
        {label}
      </Label>
      {rendered}
      {help && (
        <p id={helpId} className="mt-1 text-xs text-[var(--color-ink-muted)]">
          {help}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-xs text-[var(--color-terracotta-deep)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
