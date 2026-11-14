import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { teamMembers } from '../data/teamData';
import { centres } from '../data/centresData';
import { statsData } from '../data/reviewsData';
import { journeySteps } from '../data/journeyData';
import TeamCard from '../components/ui/TeamCard';
import JourneyCard from '../components/ui/JourneyCard';
import StatsCounter from '../components/ui/StatsCounter';
import Timeline from '../components/ui/Timeline';
import Reveal, { SplitText, useHeroParallax } from '../components/common/Motion';

function SectionHead({ title, children }) {
  return (
    <Reveal className="section-head">
      <SplitText text={title} as="h2" />
      {children && <p>{children}</p>}
    </Reveal>
  );
}

export default function AboutPage() {
  const { openBooking } = useModal();
  useHeroParallax();

  const areas = [...new Set(centres.map((c) => c.area))];
  const milestones = [
    {
      kicker: '2013',
      title: 'CLC is founded',
      desc: 'Occupational therapists, speech-language pathologists and remedial educators begin working together under one roof.'
    },
    {
      kicker: 'Growing across Maharashtra',
      title: 'More centres, same approach',
      desc: `Families can now visit us in ${areas.join(', ')}, with the same joined-up plans and parent debriefs at every centre.`
    },
    {
      kicker: 'Today',
      title: `${statsData[1].value.toLocaleString('en-IN')}+ children supported`,
      desc: 'Families come to us for help with speech, sensory needs, motor skills, attention and learning.'
    }
  ];

  return (
    <main id="main">
      {/* Page hero */}
      <section className="hero hero--page">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__bg-img" style={{ backgroundImage: "url('/assets/centre/centre-2.jpg')" }}></div>
        </div>
        <div className="hero__shapes" aria-hidden="true">
          <span className="shape shape--1"></span>
          <span className="shape shape--2"></span>
        </div>
        <div className="container position-relative">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right" aria-hidden="true"></i>
            <span aria-current="page">About</span>
          </nav>
          <p className="hero__note">About Child Learning Centre</p>
          <h1>
            {'Care that combines clinical skill with patience'.split(' ').map((w, i) => (
              <React.Fragment key={i}>
                <span className="w" style={{ '--i': i }}>{w}</span>{' '}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero__lead">
            Founded in 2013, CLC has helped over 6,000 children across Maharashtra unlock their natural developmental strengths in a welcoming, family-focused clinic setting.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn-clc btn-lg-clc" onClick={() => openBooking()}>
              Book an evaluation
            </button>
            <a href="#team" className="btn btn-clc-outline btn-hero-outline btn-lg-clc">
              Meet the team<i className="bi bi-arrow-down"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-wrap">
        <div className="container">
          <Reveal variant="zoom">
            <dl className="stats">
              {statsData.map((stat, i) => (
                <div key={i}>
                  <StatsCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    isFormatted={stat.isFormatted}
                  />
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <Reveal variant="left" className="col-lg-6">
              <div className="about-wrap">
                <div className="about-frame">
                  <img src="/assets/team/team-1.jpg" alt="The CLC therapy specialists together" />
                </div>
                <div className="float-badge" aria-hidden="true">
                  <strong>2013</strong>
                  <span>our story begins</span>
                </div>
              </div>
            </Reveal>
            <Reveal variant="right" className="col-lg-6 about-copy">
              <h2>A joined-up, multidisciplinary approach</h2>
              <p>
                We started CLC because we believe a developmental delay is not a permanent barrier. Occupational therapists, speech-language pathologists and remedial educators work together under one roof, so your child gets one holistic care plan instead of disconnected visits.
              </p>
              <p>
                Every plan is built around the child's strengths and learning profile. Therapy happens through purposeful play that your child enjoys, which builds real confidence.
              </p>
              <ul className="tick-list">
                <li><strong>One-on-one sessions</strong> with undivided attention from a qualified specialist.</li>
                <li><strong>Specialised sensory gyms</strong> with bolster barrels, tactile paths and vestibular swings.</li>
                <li><strong>Parent debriefs every session</strong>, where we review milestones and home strategies.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision and mission */}
      <section className="section section--white">
        <div className="container">
          <SectionHead title="What guides us" />
          <div className="row g-4">
            <Reveal className="col-md-6" delay={0}>
              <article className="vm-card">
                <i className="bi bi-eye" aria-hidden="true"></i>
                <h3>Our vision</h3>
                <p>A future where every child can communicate, learn and take part in everyday life with confidence.</p>
              </article>
            </Reveal>
            <Reveal className="col-md-6" delay={120}>
              <article className="vm-card">
                <i className="bi bi-bullseye" aria-hidden="true"></i>
                <h3>Our mission</h3>
                <p>To give families a clear evaluation, joined-up therapy and practical guidance for home, in a warm setting where children want to come back.</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section section--journey">
        <div className="container">
          <Reveal className="text-center mb-5">
            <div className="journey-badge">
              <span className="journey-badge-dot"></span>
              <span>Growing Together</span>
            </div>
            <h2 className="journey-title">Every child's journey is unique</h2>
            <p className="journey-subtitle">
              Every child learns and develops differently. We work alongside families to support each child's strengths, development and potential.
            </p>
          </Reveal>
          <div className="row g-4">
            {journeySteps.map((item, i) => (
              <Reveal key={item.step} className="col-12 col-sm-6 col-lg-3" delay={i * 100}>
                <JourneyCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section section--white">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <Reveal variant="left" className="col-lg-5">
              <div className="section-head mb-0">
                <h2>How CLC has grown</h2>
                <p>From one team with one idea to centres across Maharashtra.</p>
              </div>
            </Reveal>
            <div className="col-lg-7">
              <Timeline items={milestones} />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section">
        <div className="container">
          <SectionHead title="Our clinical leadership">
            Experienced, licensed pediatric clinicians dedicated to your child's milestones.
          </SectionHead>
          <div className="row g-4">
            {teamMembers.map((member, i) => (
              <Reveal key={member.id} className="col-md-6 col-lg-4" delay={i * 110}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Centres and spaces */}
      <section className="section section--white">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <Reveal variant="left" className="col-lg-6 order-lg-2">
              <div className="gallery">
                <figure><img src="/assets/centre/centre-2.jpg" alt="A parent session at a CLC centre" loading="lazy" /></figure>
                <figure><img src="/assets/centre/centre-4.jpg" alt="Parents attending a CLC workshop" loading="lazy" /></figure>
                <figure><img src="/assets/centre/centre-5.jpg" alt="A therapist speaking with parents at a centre" loading="lazy" /></figure>
              </div>
            </Reveal>
            <Reveal variant="right" className="col-lg-6 order-lg-1">
              <h2>Equipped for every sensory need</h2>
              <p>
                Our centres in {areas.join(', ')} have sensory spaces that give children vestibular, proprioceptive and tactile input in a safe, fun and regulated setting.
              </p>
              <p>
                Children learn best when they feel safe and understood. Our clinics are warm and do not feel like hospitals, so children join in happily and families feel supported.
              </p>
              <div className="chips">
                {areas.map((a) => (
                  <span key={a}><i className="bi bi-geo-alt-fill" aria-hidden="true"></i>{a}</span>
                ))}
              </div>
              <div className="mt-4 d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-clc" onClick={() => openBooking()}>
                  Schedule a clinic tour and evaluation
                </button>
                <Link to="/centres" className="btn btn-clc-outline">
                  See all centres<i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="section pt-0 pb-5">
        <div className="container">
          <Reveal variant="zoom">
            <div className="cta-band">
              <span className="shape shape--1" aria-hidden="true"></span>
              <div className="row align-items-center g-3 position-relative">
                <div className="col-lg-8">
                  <h2>Ready to talk about your child?</h2>
                  <p className="mb-0">Book an evaluation or message us on WhatsApp. We will help you choose a centre and a time.</p>
                </div>
                <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
                  <button type="button" className="btn btn-clc btn-lg-clc" onClick={() => openBooking()}>
                    Book an evaluation
                  </button>
                  <a
                    href="https://wa.me/919004460650"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-clc-outline btn-hero-outline btn-lg-clc"
                  >
                    <i className="bi bi-whatsapp"></i>WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
