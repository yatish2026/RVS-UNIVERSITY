import React, { useEffect, useState } from 'react';
import { ArrowLeft, Briefcase, Clock, GraduationCap, Loader2, Lock } from 'lucide-react';
import type { FormSchema } from './types';
import { fetchForm } from './api';
import { ApplicationForm } from './components/ApplicationForm';
import { BrandBar } from './components/BrandBar';

export const Hero: React.FC<{ schema: FormSchema; compact?: boolean }> = ({ schema, compact }) => (
  <div className="relative overflow-hidden bg-[#1D1611]">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, #F0D19E 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }}
    />
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#C6832B]/25 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#8B1E8B]/15 blur-3xl" />
    <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 ${compact ? 'py-8' : 'py-12 sm:py-16'}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-[#E4B56C]/30 bg-[#E4B56C]/10 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#F0D19E]">
        <Briefcase className="h-3.5 w-3.5" /> {schema.settings.formTitle}
      </span>
      <h1 className="mt-4 max-w-3xl font-serif text-[34px] font-bold leading-[1.1] text-white sm:text-5xl">
        {schema.settings.formSubtitle}
      </h1>
      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-[#D2C3B4]">{schema.settings.intro}</p>
      {!compact && (
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-[#AD9A88]">
          <span className="inline-flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#E4B56C]" /> Teaching & Non-Teaching positions
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#E4B56C]" /> About 10–15 minutes
          </span>
          <span className="inline-flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#E4B56C]" /> Progress saved on this device
          </span>
        </div>
      )}
    </div>
  </div>
);

export const ApplicationFormPage: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Careers – Application Form | RVS University';
    fetchForm()
      .then(setSchema)
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load the form'));
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF5EB]">
      <BrandBar
        badge="Careers"
        right={
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[13.5px] font-semibold text-[#6B5A4B] transition hover:bg-[#F3ECE0] hover:text-[#1D1611]"
          >
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back to website</span>
          </a>
        }
      />
      {!schema && !error && (
        <div className="flex min-h-[60vh] items-center justify-center text-[#867362]">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading application form…
        </div>
      )}
      {error && (
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <p className="font-serif text-2xl font-bold text-[#1D1611]">We couldn’t load the form</p>
          <p className="mt-2 text-[#867362]">{error}. Please refresh the page or try again later.</p>
        </div>
      )}
      {schema && (
        <>
          <Hero schema={schema} />
          {schema.settings.acceptingApplications ? (
            <ApplicationForm schema={schema} />
          ) : (
            <div className="mx-auto max-w-xl px-4 py-20 text-center">
              <p className="font-serif text-2xl font-bold text-[#1D1611]">Applications closed</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#867362]">{schema.settings.closedMessage}</p>
            </div>
          )}
          <footer className="border-t border-[#EDE3D6] py-8 text-center text-[12.5px] text-[#9C8B79]">
            © {new Date().getFullYear()} RVS University, Chittoor · R.V.S Nagar, Tirupathi Road, Chittoor, Andhra Pradesh – 517127
          </footer>
        </>
      )}
    </div>
  );
};

export default ApplicationFormPage;
