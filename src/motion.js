import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from './data'

gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(ScrollTrigger)

// HERO
let masterTL = gsap.timeline()

// HERO
let heroTL = gsap.timeline()

heroTL.to('h1.title span', {
    duration: 2,
    text: data.title,
    ease: "none"
})
heroTL.to('h1.title strong', {
    duration: 0.3,
    opacity: 0,
    ease: "none"
})
heroTL.fromTo('#header', {
    opacity: 0,
    y: -100,
}, {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power4.out",
})
heroTL.to('.subtitle span', {
    duration: 2,
    text: data.subtitle,
    ease: "none"
}, "<")
masterTL.add(heroTL)

// SECTIONS
let geometryTL = gsap.timeline()

geometryTL.to('#geometrySection h2 span', {
    text: data.geometryTitle,
    scrollTrigger: {
        trigger: "#geometrySection",
        start: "top center",
        end: "+=300",
        scrub: 1,
    }
})
geometryTL.to('#discountsSection h2 span', {
    text: data.discountTitle,
    scrollTrigger: {
        trigger: "#discountsSection",
        start: "top center",
        end: "+=300",
        scrub: 1,
    }
})
geometryTL.to('#averageSection h2 span', {
    text: data.averagesTitle,
    scrollTrigger: {
        trigger: "#averageSection",
        start: "top center",
        end: "+=300",
        scrub: 1,
    }
})