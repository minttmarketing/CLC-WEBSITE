import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import '../../css/ParentsCornerPage.css';


const topics = [
    {
        id: 'speech-guide',
        icon: 'bi-chat-heart',
        title: 'Speech & Communication',
        description:
            'Discover ways to encourage language, listening, interaction and communication through everyday moments.',
        tag: 'Communication',
    },
    {
        id: 'learning-guide',
        icon: 'bi-puzzle',
        title: 'Learning & Development',
        description:
            'Explore attention, memory, play and learning opportunities that support your child’s development.',
        tag: 'Learning',
    },
    {
        id: 'sensory-guide',
        icon: 'bi-brightness-high',
        title: 'Sensory Development',
        description:
            'Understand sensory experiences and how children respond to sounds, textures, movement and their surroundings.',
        tag: 'Sensory',
    },
    {
        id: 'skills-guide',
        icon: 'bi-stars',
        title: 'Everyday Skills',
        description:
            'Explore ways to encourage independence through dressing, eating, playing and daily routines.',
        tag: 'Daily life',
    },
];

const topicGuides = [
    {
        id: 'speech-guide',
        number: '01',
        title: 'Building communication through everyday moments',
        description:
            'Talk about what you are doing together, name familiar objects, read picture books and give your child time to respond. Follow their interests to make interactions enjoyable.',
        tip: 'Try this: Describe objects you see together during a walk or while playing.',
        icon: 'bi-chat-dots',
    },
    {
        id: 'learning-guide',
        number: '02',
        title: 'Making learning part of play',
        description:
            'Simple puzzles, sorting games, matching activities and pretend play can create opportunities to practise attention, problem-solving and early learning skills.',
        tip: 'Try this: Sort toys by colour, shape or size together.',
        icon: 'bi-lightbulb',
    },
    {
        id: 'sensory-guide',
        number: '03',
        title: 'Exploring the world through the senses',
        description:
            'Everyday experiences involving textures, sounds, movement and different materials can help children explore their surroundings. Follow your child’s comfort and preferences.',
        tip: 'Try this: Explore a few safe household textures together, without forcing participation.',
        icon: 'bi-hand-index-thumb',
    },
    {
        id: 'skills-guide',
        number: '04',
        title: 'Encouraging independence one step at a time',
        description:
            'Give children opportunities to participate in everyday routines. Break activities into manageable steps and allow enough time for them to try.',
        tip: 'Try this: Invite your child to help with one simple step when getting ready.',
        icon: 'bi-person-check',
    },
];

const everydayGuidance = [
    {
        number: '01',
        title: 'Make time for connection',
        description:
            'Set aside a little uninterrupted time to play, talk or read together. Small moments of connection matter.',
        icon: 'bi-heart',
    },
    {
        number: '02',
        title: 'Celebrate small steps',
        description:
            'Notice your child’s efforts and progress. Every child develops at their own pace, and small achievements count.',
        icon: 'bi-award',
    },
    {
        number: '03',
        title: 'Keep routines simple',
        description:
            'Predictable routines can help children understand what comes next and feel more comfortable through the day.',
        icon: 'bi-calendar-check',
    },
];

const faqs = [
    {
        question: 'How do I know if my child needs professional support?',
        answer:
            'If you have concerns about your child’s communication, learning, behaviour, sensory responses or everyday activities, it is okay to seek guidance. A discussion with a qualified professional can help you understand your concerns and decide on appropriate next steps.',
    },
    {
        question: 'Do all children develop at the same pace?',
        answer:
            'No. Children develop at different rates. Developmental milestones can offer general guidance, but they are not a substitute for understanding your child’s individual strengths and needs.',
    },
    {
        question: 'How can I support my child at home?',
        answer:
            'Everyday activities such as talking, reading, playing, following simple routines and encouraging independence can create valuable learning opportunities. Your child’s therapist can also suggest activities suited to their individual goals.',
    },
    {
        question: 'Can parents be involved in the therapy process?',
        answer:
            'Yes. Parent involvement can be an important part of a child’s developmental journey. Sharing observations, discussing goals and practising suggested activities at home can help support consistency.',
    },
];

export default function ParentsCornerPage() {
    const { openBooking } = useModal();

    const pageRef = useRef(null);

    useEffect(() => {
        const page = pageRef.current;

        if (!page) return;

        const revealElements = page.querySelectorAll('[data-reveal]');

        if (!revealElements.length) return;

        if (
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach((element) => {
                element.classList.add('is-visible');
            });
            return;
        }

        let observer;

        try {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: '0px 0px -50px 0px',
                }
            );

            revealElements.forEach((element) => {
                observer.observe(element);
            });

            page.classList.add('reveal-ready');
        } catch (error) {
            page.classList.remove('reveal-ready');

            revealElements.forEach((element) => {
                element.classList.add('is-visible');
            });
        }

        return () => {
            observer?.disconnect();
            page.classList.remove('reveal-ready');

            revealElements.forEach((element) => {
                element.classList.remove('is-visible');
            });
        };
    }, []);

    return (
        <main className="parents-corner-page" ref={pageRef}>
            {/* Hero */}
            <section className="parents-hero" data-reveal>
                <div className="container">
                    <div className="parents-hero__content">
                        <span className="parents-eyebrow">
                            <i className="bi bi-heart-fill me-2"></i>
                            A space for parents
                        </span>

                        <h1>
                            Every little step is a
                            <span> big part of growing.</span>
                        </h1>

                        <p>
                            Parenting comes with questions, discoveries and new experiences.
                            Find simple guidance, helpful ideas and encouragement for your
                            child’s developmental journey.
                        </p>

                        <div className="parents-hero__actions">
                            <a href="#parent-topics" className="btn btn-clc">
                                Explore Resources
                                <i className="bi bi-arrow-down ms-2"></i>
                            </a>

                            <button
                                type="button"
                                className="btn btn-clc-outline"
                                onClick={() => openBooking()}
                            >
                                Talk to Our Team
                                <i className="bi bi-arrow-up-right ms-2"></i>
                            </button>
                        </div>

                        <div className="parents-hero__note">
                            <i className="bi bi-heart me-2"></i>
                            Every child is unique. Every journey deserves understanding.
                        </div>
                    </div>

                    <div className="parents-hero__visual">
                        <img
                            src="/assets/servicess/WhatsApp%20Image%202026-10-07%20at%207.21.12%20PM%20(4).jpeg"
                            alt="Child participating in a learning activity with a therapist"
                            className="parents-hero__image"
                            loading="eager"
                        />

                        <div className="parents-hero__image-caption">
                            <i className="bi bi-heart-fill"></i>
                            <span>Learn. Connect. Grow.</span>
                        </div>

                        <div className="parents-hero__decoration" aria-hidden="true">
                            <div className="parents-hero__circle">
                                <i className="bi bi-flower1"></i>
                            </div>
                            <span className="parents-hero__dot parents-hero__dot--one"></span>
                            <span className="parents-hero__dot parents-hero__dot--two"></span>
                            <span className="parents-hero__dot parents-hero__dot--three"></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topics */}
            <section id="parent-topics" className="section parents-topics" data-reveal>
                <div className="container">
                    <div className="parents-section-heading">
                        <span className="parents-eyebrow">Explore and understand</span>
                        <h2>What would you like to learn about?</h2>
                        <p>
                            Explore topics that can help you better understand your child
                            and support their development in everyday life.
                        </p>
                    </div>

                    <div className="row g-4">
                        {topics.map((topic, index) => (
                            <div className="col-md-6 col-lg-3" key={topic.title}>
                                <article className={`parent-topic-card topic-card-${index + 1}`}>
                                    <div className="parent-topic-card__icon">
                                        <i className={`bi ${topic.icon}`}></i>
                                    </div>
                                    <span className="parent-topic-card__tag">{topic.tag}</span>
                                    <h3>{topic.title}</h3>
                                    <p>{topic.description}</p>
                                    <a href={`#${topic.id}`} className="parent-text-link">
                                        Explore guidance
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </a>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Topic Guides */}
            <section className="section parents-topic-guides" data-reveal>
                <div className="container">
                    <div className="parents-section-heading">
                        <span className="parents-eyebrow">A little guidance goes a long way</span>
                        <h2>Explore ways to support your child</h2>
                        <p>
                            Small everyday interactions can create meaningful opportunities
                            for children to explore, communicate and learn.
                        </p>
                    </div>

                    <div className="parents-topic-guides__list">
                        {topicGuides.map((guide) => (
                            <article
                                id={guide.id}
                                className="parents-topic-guide"
                                key={guide.id}
                            >
                                <div className="parents-topic-guide__number">
                                    {guide.number}
                                </div>

                                <div className="parents-topic-guide__content">
                                    <h3>{guide.title}</h3>
                                    <p>{guide.description}</p>

                                    <div className="parents-topic-guide__tip">
                                        <i className="bi bi-lightbulb me-2"></i>
                                        {guide.tip}
                                    </div>
                                </div>

                                <div className="parents-topic-guide__icon">
                                    <i className={`bi ${guide.icon}`}></i>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Everyday guidance */}
            <section
                id="everyday-guidance"
                className="section parents-guidance" data-reveal>
                <div className="container">
                    <div className="parents-section-heading">
                        <span className="parents-eyebrow">Little things that matter</span>
                        <h2>Simple ways to support your child every day</h2>
                        <p>
                            Support does not always have to begin with big changes.
                            Everyday interactions can create meaningful opportunities
                            to connect and learn.
                        </p>
                    </div>

                    <div className="row g-4">
                        {everydayGuidance.map((item) => (
                            <div className="col-md-4" key={item.number}>
                                <article className="parent-guidance-card h-100">
                                    <div className="parent-guidance-card__top">
                                        <span>{item.number}</span>
                                        <i className={`bi ${item.icon}`}></i>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </article>
                            </div>
                        ))}
                    </div>

                    <p className="parents-disclaimer">
                        <i className="bi bi-info-circle me-2"></i>
                        These are general suggestions. Each child has individual needs,
                        and professional guidance can help you identify suitable
                        strategies.
                    </p>
                </div>
            </section>

            {/* Parent reassurance */}
            <section className="parents-reassurance" data-reveal>
                <div className="container">
                    <div className="parents-reassurance__inner">
                        <div>
                            <span className="parents-eyebrow">A note for every parent</span>
                            <h2>You don't have to figure everything out alone.</h2>
                        </div>
                        <p>
                            Asking questions is a good place to start. Understanding your
                            child’s needs is a journey, and the right support can make the
                            next step feel clearer.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section id="parent-faqs" className="section parents-faq" data-reveal>
                <div className="container">
                    <div className="parents-section-heading">
                        <span className="parents-eyebrow">Here to help</span>
                        <h2>Questions parents often ask</h2>
                        <p>
                            A few helpful starting points for some common questions.
                        </p>
                    </div>

                    <div className="parents-faq__list">
                        {faqs.map((faq, index) => (
                            <details className="parents-faq__item" key={faq.question}>
                                <summary>
                                    <span>{faq.question}</span>
                                    <i className="bi bi-plus-lg"></i>
                                </summary>
                                <div className="parents-faq__answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Consultation CTA */}
            <section className="parents-cta" data-reveal>
                <div className="container">
                    <div className="parents-cta__inner">
                        <div>
                            <span className="parents-eyebrow">We're here for you</span>
                            <h2>Have questions about your child's development?</h2>
                            <p>
                                Connect with the CLC team to discuss your concerns and
                                understand the support options available.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-light parents-cta__button"
                            onClick={() => openBooking()}
                        >
                            Book a Consultation
                            <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
