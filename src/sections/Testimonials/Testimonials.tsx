import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Container from "../../components/Container/Container";
import { testimonials } from "../../data/siteData";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: true
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        queueMicrotask(() => {
            onInit(emblaApi);
            onSelect(emblaApi);
        });

        emblaApi.on("reInit", onInit);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.embla} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {testimonials.map((t, idx) => (
                            <article className={styles.card} key={`${t.name}-${idx}`}>
                                <div className={styles.quote}>
                                    <img src="/apostrophes.svg" alt="Quote" className={styles.quoteIcon} />
                                </div>
                                <div className={styles.content}>
                                    <p className={styles.text}>{t.text}</p>
                                    <div className={styles.user}>
                                        <div className={styles.avatar} aria-hidden="true" />
                                        <div>
                                            <div className={styles.name}>{t.name}</div>
                                            <div className={styles.role}>{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.indicators} aria-label="Slide indicators">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className={styles.arrows}>
                        <button
                            className={`${styles.arrowBtn} ${prevBtnDisabled ? styles.arrowDisabled : ""}`}
                            type="button"
                            onClick={scrollPrev}
                            aria-label="Previous slide"
                            disabled={prevBtnDisabled}
                        >
                            <img src="/btn-arrow.svg" alt="" className={styles.arrowIcon} />
                        </button>

                        <button
                            className={`${styles.arrowBtn} ${nextBtnDisabled ? styles.arrowDisabled : ""}`}
                            type="button"
                            onClick={scrollNext}
                            aria-label="Next slide"
                            disabled={nextBtnDisabled}
                        >
                            <img src="/btn-arrow.svg" alt="" className={`${styles.arrowIcon} ${styles.arrowRight}`} />
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}