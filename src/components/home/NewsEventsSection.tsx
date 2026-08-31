import React from 'react';
import { Calendar, Bell, ArrowRight, MapPin, Clock, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { NEWS_ANNOUNCEMENTS, UPCOMING_EVENTS } from '../../data/universityData';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const NewsEventsSection: React.FC = () => {
  return (
    <section id="news-events" className="py-20 lg:py-28 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Section 10: News & Announcements (Slides from LEFT) */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="left" delay={100}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <SectionHeading
                  number="10"
                  eyebrow="Campus Updates"
                  title="News & Circulars"
                  subtitle="Official notifications, press releases, and academic announcements."
                />
                <a
                  href="#all-news"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-navy-900 hover:text-gold-600 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>

            <div className="space-y-4">
              {NEWS_ANNOUNCEMENTS.map((news, idx) => (
                <Reveal key={news.id} direction="left" delay={150 + idx * 80}>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-gold-400 hover:bg-white transition-all duration-200 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-navy-900 text-gold-300">
                            {news.category}
                          </span>
                          {news.isUrgent && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 animate-pulse">
                              Urgent
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{news.date}</span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-navy-950 group-hover:text-gold-600 transition-colors mb-1.5 leading-snug">
                        <a href={news.link}>{news.title}</a>
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {news.snippet}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <a
                        href={news.link}
                        className="inline-flex items-center gap-1 text-xs font-bold text-gold-600 hover:text-gold-700 transition-colors"
                      >
                        <span>Read Full Notice</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Section 11: Upcoming Events (Slides from RIGHT) */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="right" delay={100}>
              <div className="pb-2 border-b border-slate-100">
                <SectionHeading
                  number="11"
                  eyebrow="Mark Your Calendar"
                  title="University Events"
                  subtitle="Hackathons, international symposiums, and cultural festivals."
                />
              </div>
            </Reveal>

            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event, idx) => (
                <Reveal key={event.id} direction="right" delay={150 + idx * 80}>
                  <div className="p-5 rounded-xl bg-navy-950 text-white border border-navy-800 hover:border-gold-500/50 transition-all duration-200 flex items-start gap-4 group">
                    {/* Event Date Badge */}
                    <div className="flex-shrink-0 w-14 h-16 rounded-xl bg-navy-900 border border-gold-500/40 flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-serif font-extrabold text-gold-300 leading-none">
                        {event.date.day}
                      </span>
                      <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase mt-0.5">
                        {event.date.month}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-1">
                        {event.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-white group-hover:text-gold-300 transition-colors leading-snug mb-2">
                        {event.title}
                      </h4>

                      <div className="space-y-1 text-xs text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-gold-400 flex-shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-gold-400 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="up" delay={400}>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <h5 className="font-serif font-bold text-navy-950 mb-1">Looking to host a seminar?</h5>
                <p className="text-xs text-slate-600 mb-4">Explore university auditorium bookings and conference halls.</p>
                <Button variant="outline-navy" size="sm" href="#contact">
                  Contact Events Directorate
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
