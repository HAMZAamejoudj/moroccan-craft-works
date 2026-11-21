'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { MoroccanLogo } from '../ui/MoroccanLogo'
import { subscribeNewsletter } from '@/app/actions/newsletter'

const FedExIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-auto' }) => (
  <svg
    viewBox="0 7.8 24 8.5"
    fill="currentColor"
    role="img"
    aria-label="FedEx"
    className={className}
  >
    <path d="M22.498 14.298c-.016-.414.345-.751.75-.755a.745.745 0 0 1 .752.755.755.755 0 0 1-.751.745zm.759-.083c.067-.02.164-.042.162-.13.007-.09-.086-.133-.162-.134h-.163v.263c0 .001.165-.002.163.001zm-.163.107v.418h-.14v-.91h.327c.156-.021.294.092.286.253a.218.218 0 0 1-.156.19c.162.083.108.322.173.467h-.156a2.355 2.355 0 0 1-.04-.205c-.018-.093-.047-.229-.17-.213h-.124zm.76-.024a.603.603 0 0 0-.605-.632c-.338-.012-.62.302-.605.632a.619.619 0 0 0 .605.622.61.61 0 0 0 .605-.622zm-5.052-.579l-.878 1.008h-1.306l1.559-1.745-1.56-1.75h1.355l.902.997.878-.998h1.306l-1.543 1.743 1.559 1.753h-1.371l-.901-1.008zm-4.703-.352v-.827h1.904v-1.506l1.724 1.948-1.724 1.941v-1.556h-1.904zm1.56 1.36h-3.2V9.044h3.224v1.024H13.77v1.163h1.888v.958h-1.904v1.522h1.904v1.016zm-5.705-.655c-.54.017-.878-.552-.877-1.04-.01-.507.307-1.123.878-1.105.579-.025.871.6.845 1.103.023.501-.29 1.062-.846 1.042zM4.743 12.41c.076-.358.403-.67.78-.663a.788.788 0 0 1 .803.663H4.743zm15.182.564l1.815-2.047h-2.125l-.74.844-.763-.844h-4.037v-.548h1.912V8.741H10.84v2.58c-.362-.448-.981-.559-1.526-.492-.782.123-1.427.762-1.634 1.514-.254-.958-1.179-1.588-2.157-1.554-.781.009-1.6.365-1.987 1.071v-.818h-1.87v-.9h2.043v-1.4H0v6.287h1.666v-2.644h1.666a7.59 7.59 0 0 0-.082.622c-.013 1.232 1.042 2.27 2.274 2.236a2.204 2.204 0 0 0 2.157-1.432H6.254c-.14.268-.441.38-.73.36-.457.009-.83-.417-.829-.86h2.914c.083 1.027.988 1.966 2.043 1.947a1.53 1.53 0 0 0 1.19-.639v.41h7.215l.754-.86.754.86h2.192l-1.832-2.055z" />
  </svg>
)

const DhlIcon: React.FC<{ className?: string }> = ({ className = 'h-4.5 w-auto' }) => (
  <svg
    viewBox="0 9.8 24 4.5"
    fill="currentColor"
    role="img"
    aria-label="DHL"
    className={className}
  >
    <path d="M4.22 10.303l-.767 1.043h4.18c.21 0 .208.078.105.218-.105.142-.28.39-.386.534-.054.073-.154.207.171.207h1.71l.505-.69c.314-.426.028-1.312-1.095-1.312H4.22zm7.204 0l-1.475 2.002h5.39l1.473-2.002H14.61l-.843 1.146h-.985l.846-1.146h-2.203zm6.105 0l-1.474 2.002h2.334l1.472-2.002H17.53zm-12.845 1.3l-1.54 2.094h3.754c1.24 0 1.932-.844 2.145-1.136h-2.56c-.326 0-.226-.133-.172-.207.107-.143.283-.388.388-.53.104-.14.107-.22-.105-.22h-1.91zM0 12.562v.242h3.398l.176-.242H0zm9.762 0l-.836 1.136h2.203l.836-1.136H9.762zm3.185 0l-.836 1.136h2.203l.836-1.136h-2.203zm2.918 0s-.159.22-.238.326c-.276.374-.033.81.87.81h3.538l.834-1.136h-5.004zm5.408 0l-.177.242H24v-.242h-2.727zM0 13.01v.24h3.068l.178-.24H0zm20.943 0l-.175.24H24v-.24h-3.057zM0 13.457v.24h2.74l.176-.24H0zm20.615 0l-.177.24H24v-.24h-3.385z" />
  </svg>
)

const UpsIcon: React.FC<{ className?: string }> = ({ className = 'h-6.5 w-auto' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="UPS"
    className={className}
  >
    <path d="M11.668 14.544l-.028-5.226c.138-.055.387-.111.608-.111.995 0 1.41.774 1.41 2.682 0 1.853-.47 2.765-1.438 2.765-.22 0-.441-.055-.552-.11zM3.124 7.438c4.203-3.843 9.29-4.866 14.018-4.866 1.3 0 2.544.083 3.76.194h-.028v11.253c0 2.184-.774 3.926-2.295 5.171-1.355 1.134-5.447 2.959-6.581 3.456-1.161-.525-5.253-2.378-6.581-3.456-1.493-1.244-2.295-3.014-2.295-5.171V7.438zm12.664 2.599c.028.912.276 1.576 1.687 2.406.747.442 1.051.747 1.051 1.272 0 .581-.387.94-1.023.94-.553 0-1.189-.304-1.631-.691v1.576c.553.304 1.217.525 1.88.525 1.687 0 2.433-1.189 2.461-2.267.028-.995-.249-1.742-1.659-2.571-.608-.387-1.134-.636-1.106-1.244 0-.581.525-.802.995-.802.581 0 1.161.332 1.521.691V8.378c-.304-.221-.94-.581-1.88-.553-1.135.028-2.296.829-2.296 2.212zm-5.834 9.484h1.714l-.028-3.594c.166.028.415.083.774.083 1.908 0 2.986-1.687 2.986-4.175 0-2.461-1.106-4.009-3.152-4.009-.94 0-1.687.221-2.295.608v11.087zm-5.945-6.166c0 1.797.829 2.71 2.516 2.71 1.051 0 1.908-.249 2.571-.691V7.991H7.41v6.387c-.194.138-.47.221-.802.221-.774 0-.885-.719-.885-1.189V7.991H4.009v5.364zM22.12 2.295v11.723c0 2.516-.94 4.645-2.765 6.111-1.549 1.3-6.332 3.429-7.355 3.871-1.023-.442-5.806-2.571-7.355-3.843-1.797-1.465-2.765-3.594-2.765-6.111V2.295C4.756.747 8.074 0 12 0s7.244.747 10.12 2.295zm-.304.221c-2.71-1.465-6-2.184-9.788-2.184s-7.079.746-9.788 2.184v11.502c0 2.433.912 4.452 2.627 5.862 1.576 1.3 6.581 3.484 7.161 3.76.581-.249 5.585-2.433 7.161-3.733 1.714-1.41 2.627-3.429 2.627-5.862V2.516zm-2.433 20.295c0 .47-.387.829-.829.829a.831.831 0 0 1-.829-.829c0-.47.387-.829.829-.829.441 0 .801.359.829.829zm-.166 0a.679.679 0 0 0-.664-.691c-.359 0-.664.332-.664.691 0 .359.304.664.664.664a.673.673 0 0 0 .664-.664zm-.553.055c.028.055.304.442.304.442h-.221s-.276-.387-.276-.415h-.028v.415h-.194v-.995l.304-.028c.249 0 .332.166.332.304s-.083.25-.221.277zm.027-.276c0-.055 0-.138-.166-.138h-.083v.304h.028c.194 0 .221-.083.221-.166z" />
  </svg>
)

const SHIPPING_PARTNERS = [
  { name: 'FedEx', Icon: FedExIcon },
  { name: 'DHL', Icon: DhlIcon },
  { name: 'UPS', Icon: UpsIcon },
]

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    try {
      const res = await subscribeNewsletter(email)
      if (res.success) {
        setSubscribed(true)
        setMessage(res.message || 'Thank you for subscribing!')
      } else {
        setMessage(res.error || 'Failed to subscribe')
      }
    } catch {
      setSubscribed(true)
      setMessage('Thank you for subscribing!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer id="footer" className="relative w-full bg-[#0A0A0A] text-stone-200 pt-14 pb-8 rounded-t-2xl sm:rounded-t-[24px] border-t border-moroccan-gold/40 shadow-[0_-4px_24px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* World Map Background across entire footer */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-[0.38] bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/images/footer/world-map.svg')",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row: Logo + Products + Services + Company + Newsletter (All in parallel) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 text-xs items-start">
          {/* Col 1: Logo and Brief Tagline */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3.5 pr-0 lg:pr-2">
            <MoroccanLogo layout="horizontal" variant="white" height={60} />
            <p className="text-stone-200 text-xs leading-relaxed max-w-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Handcrafted masterworks, bespoke manufacturing and reliable freight export worldwide.
            </p>
          </div>

          {/* Col 2: Products */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              Products
            </h4>
            <ul className="space-y-2 text-stone-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              <li>
                <Link href="/products/rugs" className="hover:text-moroccan-gold-light transition-colors">
                  Rugs and Carpets
                </Link>
              </li>
              <li>
                <Link href="/products/zellige" className="hover:text-moroccan-gold-light transition-colors">
                  Zellige and Architecture
                </Link>
              </li>
              <li>
                <Link href="/products/pottery" className="hover:text-moroccan-gold-light transition-colors">
                  Pottery and Ceramics
                </Link>
              </li>
              <li>
                <Link href="/products/brass" className="hover:text-moroccan-gold-light transition-colors">
                  Brass and Copper
                </Link>
              </li>
              <li>
                <Link href="/products/leather" className="hover:text-moroccan-gold-light transition-colors">
                  Leather Goods
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              Services
            </h4>
            <ul className="space-y-2 text-stone-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              <li>
                <Link href="/services/wholesale" className="hover:text-moroccan-gold-light transition-colors">
                  Wholesale Supply
                </Link>
              </li>
              <li>
                <Link href="/services/private-label" className="hover:text-moroccan-gold-light transition-colors">
                  Private Label & OEM
                </Link>
              </li>
              <li>
                <Link href="/how-to-order" className="hover:text-moroccan-gold-light transition-colors">
                  How to Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-moroccan-gold-light transition-colors">
                  Trade FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              Company
            </h4>
            <ul className="space-y-2 text-stone-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              <li>
                <Link href="/about" className="hover:text-moroccan-gold-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-moroccan-gold-light transition-colors">
                  Our Heritage & Artisans
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-moroccan-gold-light transition-colors">
                  Craftsmanship & Ethics
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-moroccan-gold-light transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Payment Method and Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            {/* Payment Method */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                Payment Method
              </h4>
              <div className="w-full max-w-[215px] rounded-xl bg-white p-3 shadow-md overflow-hidden border border-stone-200/20">
                <Image
                  src="/images/footer/payment-methods.png"
                  alt="Accepted payment methods worldwide: Cards, Wire Transfer, Wise, MoneyGram"
                  width={208}
                  height={213}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2 border-t border-stone-800 space-y-2">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                Subscribe to our Newsletter
              </h4>
              <p className="text-stone-200 text-xs leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                Get updates on new collections and Moroccan craft trends.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs py-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative mt-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3.5 pr-11 py-2.5 bg-stone-900/90 border border-stone-700/80 rounded-lg text-xs text-white placeholder-stone-400 focus:outline-none focus:border-moroccan-gold"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white rounded-md flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Methods Trust Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 pr-3.5 border-r border-stone-700/80 select-none">
              Ships via
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              {SHIPPING_PARTNERS.map(({ name, Icon }) => (
                <div
                  key={name}
                  title={name}
                  aria-label={name}
                  className="group flex items-center justify-center h-10 px-5 rounded-full bg-white/[0.08] hover:bg-moroccan-gold/20 border border-moroccan-gold/30 hover:border-moroccan-gold/60 transition-all duration-200 cursor-default select-none shadow-sm"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-stone-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-moroccan-gold animate-pulse" />
            <span>Tracked and insured worldwide express delivery</span>
          </div>
        </div>

        {/* Bottom Row: Copyright and Social Media Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          <div>
            &copy; 2026 MoroccanCraftWorks. All rights reserved.
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 text-stone-300">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full hover:text-moroccan-gold hover:bg-white/5 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full hover:text-moroccan-gold hover:bg-white/5 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full hover:text-moroccan-gold hover:bg-white/5 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="p-2 rounded-full hover:text-moroccan-gold hover:bg-white/5 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-full hover:text-moroccan-gold hover:bg-white/5 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
