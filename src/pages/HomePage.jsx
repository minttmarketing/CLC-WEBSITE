import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { services } from '../data/servicesData';
import { centres } from '../data/centresData';
import { teamMembers } from '../data/teamData';
import { reviews, statsData } from '../data/reviewsData';
import { processSteps } from '../data/journeyData';
import StatsCounter from '../components/ui/StatsCounter';
import ServiceCard from '../components/ui/ServiceCard';
import CentreCard from '../components/ui/CentreCard';
import TeamCard from '../components/ui/TeamCard';
import ReviewCard from '../components/ui/ReviewCard';
import Timeline from '../components/ui/Timeline';
import Faq from '../components/ui/Faq';
import BookingForm from '../components/forms/BookingForm';
import Reveal, { SplitText, useHeroParallax } from '../components/common/Motion';

const HERO_WORDS = 'Every child has potential. We help build the bridge to it.'.split(' ');
const ROTATE = ['speech', 'movement', 'sensory needs', 'attention', 'learning'];
const MARQUEE = [
  'Occupational therapy',
  'Speech and language',
  'Sensory integration',
  'ADHD and behaviour',
  'Special education',
  'Parent guidance'
];
const CONCERN_CARDS = [
  { icon: 'bi-chat-heart', title: 'Late or unclear speech', text: 'Delayed speech, unclear pronunciation, stammering or trouble forming sentences.', value: 'Speech & Communication' },
  { icon: 'bi-balloon-heart', title: 'Sensory sensitivities', text: 'Easily overwhelmed by sounds, textures or movement, or seeking a lot of it.', value: 'Occupational / Sensory' },
  { icon: 'bi-pencil', title: 'Handwriting and motor skills', text: 'Awkward pencil grasp, clumsiness, or difficulty with dressing and eating.', value: 'Occupational / Sensory' },
  { icon: 'bi-lightning-charge', title: 'Attention and behaviour', text: 'Struggles to sit still, gets distracted, acts impulsively or finds class routines hard.', value: 'ADHD / Attention' },
  { icon: 'bi-book', title: 'Reading and learning', text: 'Difficulty with reading, writing or phonics, including dyslexia.', value: 'Special Education' },
  { icon: 'bi-question-circle', title: 'Not sure yet', text: 'Tell us what you have noticed and we will help you work out where to start.', value: 'General Screening' }
];

function SectionHead({ title, children }) {
  return (
    <Reveal className="section-head">
      <SplitText text={title} as="h2" />
      {children && <p>{children}</p>}
    </Reveal>
  );
}

export default function HomePage() {
  const { openBooking, openVideo } = useModal();
  const [centreFilter, setCentreFilter] = useState('all');
  const [ri, setRi] = useState(0);
  useHeroParallax();

  useEffect(() => {
    const t = setInterval(() => setRi((i) => (i + 1) % ROTATE.length), 2600);
    return () => clearInterval(t);
  }, []);

  const filteredCentres =
    centreFilter === 'all' ? centres : centres.filter((c) => c.category === centreFilter);

  const centreList = centres.map((c) => c.area).join(', ');
  const faqs = [
    { q: 'What happens at the first visit?', a: 'Your child is evaluated through play and everyday tasks while we listen to what you have noticed at home or school. Afterwards we explain what we found in plain language and suggest a plan.' },
    { q: 'How long is each session?', a: 'Each session is 40 minutes and ends with a short debrief, so you know what we worked on and what to practise at home.' },
    { q: 'How do I book an evaluation?', a: 'Fill in the form on this page or message us on WhatsApp. We will get back to you to confirm a centre and a time that suit your family.' },
    { q: 'Which centres can we visit?', a: `We have centres in ${centreList}. Each one has its own address and map on the centres page.` },
    { q: 'Will we get activities to do at home?', a: 'Yes. Every session ends with simple activities you can follow at home, and we review progress with you regularly and adjust the plan.' },
    { q: 'What are your clinic hours?', a: 'Monday to Saturday, 9:00 AM to 7:30 PM.' }
  ];

  return (
    <main id="main">
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__bg-img"></div>
        </div>
        <div className="hero__shapes" aria-hidden="true">
          <span className="shape shape--1"></span>
          <span className="shape shape--2"></span>
          <span className="shape shape--3"></span>
        </div>
        <div className="container position-relative">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-7 col-xl-8">
              <p className="hero__note">13+ years of compassionate child rehabilitation</p>
              <h1>
                {HERO_WORDS.map((w, i) => (
                  <React.Fragment key={i}>
                    <span className={`w${w === 'potential.' ? ' hl' : ''}`} style={{ '--i': i }}>
                      {w}
                    </span>{' '}
                  </React.Fragment>
                ))}
              </h1>
              <p className="hero__lead">
                Pediatric occupational therapy, speech and language support, sensory integration and ADHD care, delivered across Mumbai, Navi Mumbai, Thane, Nagpur and Nashik.
              </p>
              <p className="hero__rotator" aria-hidden="true">
                Specialist help with <span key={ri} className="rotator">{ROTATE[ri]}</span>
              </p>
              <div className="hero__actions">
                <button type="button" className="btn btn-clc btn-lg-clc" onClick={() => openBooking()}>
                  Book an evaluation
                </button>
                <a
                  href="https://wa.me/919004460650?text=Hello%20CLC%20Team,%20I%20would%20like%20to%20inquire%20about%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-clc-outline btn-hero-outline btn-lg-clc"
                >
                  <i className="bi bi-whatsapp"></i>Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="col-lg-5 col-xl-4 d-none d-lg-block">
              <aside className="hero-panel" aria-labelledby="trustTitle">
                <h2 id="trustTitle">Why parents choose CLC</h2>
                <ul>
                  <li>
                    <i className="bi bi-people-fill" aria-hidden="true"></i>
                    <div>
                      <strong>One team, one roof</strong>
                      <span>Occupational and speech therapists work together on your child's plan.</span>
                    </div>
                  </li>
                  <li>
                    <i className="bi bi-balloon-heart-fill" aria-hidden="true"></i>
                    <div>
                      <strong>Fully equipped sensory gyms</strong>
                      <span>Swings, bolsters and fine-motor stations.</span>
                    </div>
                  </li>
                  <li>
                    <i className="bi bi-chat-heart-fill" aria-hidden="true"></i>
                    <div>
                      <strong>You stay in the loop</strong>
                      <span>A short debrief with parents after every 40-minute session.</span>
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll to the next section">
          <i className="bi bi-chevron-double-down"></i>
        </a>
      </section>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="marquee__item">
              {m}
              <i className="bi bi-stars"></i>
            </span>
          ))}
        </div>
      </div>

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

      {/* About preview */}
      <section id="about" className="section">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <Reveal variant="left" className="col-lg-6">
              <div className="about-wrap">
                <div className="about-frame">
                  <img src="/assets/team/team-1.jpg" alt="The CLC therapy team together at a centre" />
                </div>
                <div className="float-badge" aria-hidden="true">
                  <strong>{statsData[0].value}+</strong>
                  <span>years of care</span>
                </div>
              </div>
            </Reveal>
            <Reveal variant="right" className="col-lg-6 about-copy">
              <h2>Care that combines clinical skill with patience</h2>
              <p>
                We started CLC because we believe a developmental delay is not a permanent barrier. Occupational therapists, speech-language pathologists and remedial educators work together under one roof, so your child gets joined-up support instead of separate appointments.
              </p>
              <p>Every plan starts with a careful evaluation, uses play your child enjoys, and includes simple guidance you can follow at home.</p>
              <ul className="tick-list">
                <li><strong>One-on-one plans</strong> built around your child's own pace.</li>
                <li><strong>Sensory gyms</strong> with suspended swings, bolster barrels and fine-motor stations.</li>
                <li><strong>Parent debriefs</strong> after every session, so you know what we worked on.</li>
              </ul>
              <div className="mt-4">
                <Link to="/about" className="btn btn-clc-outline">
                  Read more about our approach<i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Concerns */}
      <section id="concerns" className="section section--white">
        <div className="container">
          <SectionHead title="How can we support your child?">
            Pick what you are noticing and we will take it from there. Your choice is filled into the booking form for you.
          </SectionHead>
          <div className="row g-3 g-lg-4">
            {CONCERN_CARDS.map((c, i) => (
              <Reveal key={c.title} className="col-12 col-md-6 col-lg-4" delay={(i % 3) * 90}>
                <button type="button" className="concern" onClick={() => openBooking(c.value)}>
                  <span className="concern__ico"><i className={`bi ${c.icon}`} aria-hidden="true"></i></span>
                  <span className="concern__body">
                    <strong>{c.title}</strong>
                    <span>{c.text}</span>
                  </span>
                  <i className="bi bi-arrow-right concern__go" aria-hidden="true"></i>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Therapies */}
      <section id="services" className="section">
        <div className="container">
          <SectionHead title="Therapies we offer">
            Each programme is led by a licensed practitioner and adapted to your child.
          </SectionHead>
          <div className="row g-4">
            {services.map((s, i) => (
              <Reveal key={s.id} className="col-12 col-sm-6 col-lg-3" delay={i * 100}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section section--white">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <Reveal variant="left" className="col-lg-5">
              <div className="section-head mb-0">
                <h2>Your first visit, step by step</h2>
                <p>Starting therapy can feel like a big step. This is what to expect, so nothing comes as a surprise.</p>
              </div>
              <div className="process-aside">
                <strong>Each session is 40 minutes</strong> and ends with a short debrief, so you always know what we worked on and what to practise at home.
              </div>
              <button type="button" className="btn btn-clc process-cta" onClick={() => openBooking()}>
                Book an evaluation
              </button>
            </Reveal>
            <div className="col-lg-7">
              <Timeline items={processSteps.map((s) => ({ title: s.title, desc: s.desc }))} />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section">
        <div className="container">
          <SectionHead title="Your child's support team">
            Experienced, licensed clinicians who work towards your child's everyday goals.
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

      {/* Video */}
      <section id="videos" className="section section--white">
        <div className="container">
          <SectionHead title="Watch and learn">
            A look inside our therapy sessions, with guidance parents can use at home.
          </SectionHead>
          <div className="row align-items-center g-4 g-lg-5">
            <Reveal variant="zoom" className="col-lg-7">
              <button
                type="button"
                className="video-thumb"
                onClick={() => openVideo('D1gxGckdo4c')}
                aria-label="Play video: How sensory integration regulates attention"
              >
                <img src="/assets/centre/centre-1.jpg" alt="Parents and children at a CLC centre" />
                <span className="video-thumb__play" aria-hidden="true">
                  <i className="bi bi-play-fill"></i>
                </span>
              </button>
            </Reveal>
            <Reveal variant="right" className="col-lg-5 video-copy">
              <h3>How sensory integration helps children focus</h3>
              <p>
                See how swings and deep-pressure activities help children who feel overwhelmed by sound, touch or movement settle and pay attention.
              </p>
              <button type="button" className="btn btn-clc-outline" onClick={() => openVideo('D1gxGckdo4c')}>
                <i className="bi bi-play-circle me-2"></i>Watch the video
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Centres */}
      <section id="centres" className="section">
        <div className="container">
          <SectionHead title="Find a centre near you">
            Sensory-equipped clinics in Mumbai, Navi Mumbai, Thane, Nagpur and Nashik.
          </SectionHead>
          <div className="filter-bar" role="group" aria-label="Filter centres by area">
            {[
              ['all', 'All centres'],
              ['Navi Mumbai', 'Navi Mumbai'],
              ['Mumbai / Thane', 'Mumbai & Thane'],
              ['Other', 'Nagpur & Nashik']
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                className="filter-btn"
                aria-pressed={centreFilter === val}
                onClick={() => setCentreFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="row g-4" aria-live="polite">
            {filteredCentres.map((centre, i) => (
              <CentreCard key={centre.id} centre={centre} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="section section--white">
        <div className="container">
          <SectionHead title="What parents say">
            Words from families whose children have made progress with CLC.
          </SectionHead>
          <div className="row g-4">
            {reviews.map((rev, i) => (
              <Reveal key={rev.id} className="col-md-6 col-lg-4" delay={i * 110}>
                <ReviewCard review={rev} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <SectionHead title="Questions parents ask">
            Short answers to the things families usually want to know first.
          </SectionHead>
          <Reveal>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* Contact / Quick Booking */}
      <section id="contact" className="section section--white">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <Reveal variant="left" className="col-lg-5">
              <div className="section-head mb-0">
                <h2>Book an evaluation</h2>
                <p>
                  Tell us a little about your child. We will message you on WhatsApp to confirm a time that suits your family.
                </p>
              </div>
              <ul className="contact-list">
                <li>
                  <span className="ico"><i className="bi bi-telephone" aria-hidden="true"></i></span>
                  <div>
                    <strong>Call us</strong>
                    <a href="tel:+919004460650">+91 90044 60650</a>
                  </div>
                </li>
                <li>
                  <span className="ico"><i className="bi bi-whatsapp" aria-hidden="true"></i></span>
                  <div>
                    <strong>WhatsApp</strong>
                    <a href="https://wa.me/919004460650" target="_blank" rel="noopener noreferrer">Message the clinic</a>
                  </div>
                </li>
                <li>
                  <span className="ico"><i className="bi bi-clock" aria-hidden="true"></i></span>
                  <div>
                    <strong>Clinic hours</strong>
                    <span className="v">Monday to Saturday, 9:00 AM – 7:30 PM</span>
                  </div>
                </li>
                <li>
                  <span className="ico"><i className="bi bi-geo-alt" aria-hidden="true"></i></span>
                  <div>
                    <strong>Head office</strong>
                    <span className="v">Sector 29, Nerul East, Navi Mumbai</span>
                  </div>
                </li>
              </ul>
            </Reveal>
            <Reveal variant="right" className="col-lg-7">
              <div className="form-card">
                <BookingForm idPrefix="inline" withHeading={true} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
