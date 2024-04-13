import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from './data'

gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(ScrollTrigger)

// MASTER
let masterTL = gsap.timeline()

// HERO
let heroTL = gsap.timeline()

heroTL.to('h1.title span', {
    duration: 2,
    text: data.title,
    ease: "none",
    delay: 2,
})
heroTL.to('h1.title strong', {
    duration: 0.3,
    opacity: 0,
    ease: "none"
})
heroTL.fromTo('#header', {
    opacity: 0,
}, {
    opacity: 1,
    duration: 1.2,
    ease: "power4.out",
})
heroTL.to('.subtitle span', {
    duration: 2,
    text: data.subtitle,
    ease: "none"
}, "<")
masterTL.add(heroTL)

// SECTIONS
let sectionsTL = gsap.timeline()

sectionsTL.to('#geometrySection h2 span', {
    text: data.geometryTitle,
    scrollTrigger: {
        trigger: "#geometrySection",
        start: "top center",
        end: "+=300",
        scrub: 1,
    }
})
sectionsTL.to('#discountsSection h2 span', {
    text: data.discountTitle,
    scrollTrigger: {
        trigger: "#discountsSection",
        start: "top center",
        end: "+=300",
        scrub: 1,
    }
})
sectionsTL.to('#averageSection h2 span', {
    text: data.averagesTitle,
    scrollTrigger: {
        trigger: "#averageSection",
        start: "top center",
        end: "+=300",
        scrub: 1,
    }
})