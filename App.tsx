
import React, { useEffect, useRef, useState } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Instagram, 
  Star, 
  Clock, 
  ChefHat, 
  Wine,
  Sparkles,
  MessageSquare,
  Flame,
  Users,
  Pizza,
  UtensilsCrossed
} from 'lucide-react';
import { MENU_ITEMS, STATS } from './constants';
import { MenuItem } from './types';
import { getAIPizzaRecommendation } from './geminiService';

declare const gsap: any;
declare const ScrollTrigger: any;

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'pizzas' | 'carnes' | 'coquetelaria'>('pizzas');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".header-nav", { y: -100, opacity: 0, duration: 1, ease: "power4.out" });

    const tlHero = gsap.timeline();
    tlHero.from(".hero-title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" })
          .from(".hero-sub", { y: 50, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.8")
          .from(".hero-cta", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");

    const sections = [aboutRef, menuRef, statsRef];
    sections.forEach((ref) => {
      if (ref.current) {
        gsap.from(ref.current.querySelectorAll(".reveal-item"), {
          scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
          y: 60, opacity: 0, stagger: 0.2, duration: 1, ease: "power3.out"
        });
      }
    });

    gsap.to(".hero-bg", {
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
      y: 150, ease: "none"
    });
  }, []);

  const handleAiRecommendation = async () => {
    setIsAiLoading(true);
    const recommendation = await getAIPizzaRecommendation("com fome e buscando tradição", "ingredientes frescos e massa leve");
    setAiRecommendation(recommendation || null);
    setIsAiLoading(false);
  };

  const filteredMenu = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-slate-950 text-[#FDFCF0]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass-header header-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex flex-col items-center">
              <span className="text-4xl font-logo text-accent leading-none logo-smoke">Casarão</span>
              <div className="flex flex-col items-center -mt-2">
                <div className="w-12 h-[1px] bg-accent/50 mb-1"></div>
                <div className="text-[9px] text-accent tracking-[0.4em] uppercase font-bold text-center">da xv</div>
              </div>
              <div className="absolute -top-3 -right-6 opacity-60">
                <Flame size={18} className="text-accent animate-pulse" />
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10 font-medium text-[10px] tracking-[0.3em] uppercase">
            <a href="#menu" className="hover:text-accent transition-colors">Cardápio</a>
            <a href="#experiencia" className="hover:text-accent transition-colors">O Casarão</a>
            <a href="#contato" className="hover:text-accent transition-colors">Localização</a>
            <button className="bg-accent text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-accent/10">
              Pedir Agora
            </button>
          </nav>

          <button className="md:hidden text-accent" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950 z-10" />
          <img 
            src="https://drive.google.com/uc?id=12_Uc5muDl3b2ng4eE_kcwwJjJXIQT1-m" 
            alt="Fachada Casarão da XV" 
            className="w-full h-[120%] object-cover hero-bg"
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <div className="reveal-item mb-6">
            <span className="inline-block px-4 py-1 border border-accent/40 text-accent rounded-full text-[10px] font-bold uppercase tracking-[0.4em]">
              Desde 2009 • Maringá
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-tight hero-title text-shadow-lg">
            Tradição <br />
            <span className="text-accent italic font-serif">Servida em Fatias.</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-slate-300 max-w-2xl mx-auto mb-12 hero-sub">
            O refúgio rústico no coração da XV de Novembro onde o tempo para e o sabor acontece.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 hero-cta">
            <a href="#menu" className="w-full md:w-auto bg-[#8B4513] hover:bg-[#6D360F] text-white px-12 py-5 rounded-sm font-bold transition-all uppercase tracking-[0.2em] text-xs shadow-2xl">
              Explorar Cardápio
            </a>
            <a href="#contato" className="w-full md:w-auto border border-accent/50 text-accent px-12 py-5 rounded-sm font-bold hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-[0.2em] text-xs">
              Como Chegar
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" ref={aboutRef} className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative reveal-item">
              <div className="absolute -top-12 -left-12 w-48 h-48 border-2 border-accent/10 z-0" />
              <img 
                src="https://drive.google.com/uc?id=1VC03VMQVIZmUff8X-lQvgtrxe7blM8cm" 
                alt="Nosso Ambiente" 
                className="relative z-10 w-full h-[650px] object-cover rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#8B4513] p-10 z-20 shadow-2xl reveal-item">
                <UtensilsCrossed className="text-accent w-14 h-14 mb-6" />
                <h3 className="text-white text-2xl font-bold font-serif mb-3 italic">Ambiente Único</h3>
                <p className="text-slate-200 text-sm font-light leading-relaxed">Produção artesanal unida a uma arquitetura preservada e acolhedora.</p>
              </div>
            </div>
            
            <div className="reveal-item space-y-10">
              <div>
                <span className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 block">A Casa</span>
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  O rústico <br />
                  <span className="text-accent italic font-serif">é o nosso luxo.</span>
                </h2>
                <p className="text-slate-300 text-xl leading-relaxed font-light">
                  No Casarão da XV, a arquitetura preservada encontra o calor do forno a lenha. Nossa massa de 48h de fermentação lenta é o resultado de uma busca incansável pela perfeição.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-900/40 border border-white/5 rounded-sm hover:border-accent/30 transition-all">
                  <div className="text-accent font-serif text-5xl mb-3 font-bold">48h</div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Fermentação Lenta</p>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed">Leveza inigualável que respeita seu paladar.</p>
                </div>
                <div className="p-8 bg-slate-900/40 border border-white/5 rounded-sm hover:border-accent/30 transition-all">
                  <div className="text-accent font-serif text-5xl mb-3 font-bold">Lenha</div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Sabor Defumado</p>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed">O aroma inconfundível da madeira selecionada.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" ref={menuRef} className="py-32 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal-item">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 block">O Cardápio</span>
            <h2 className="text-5xl md:text-8xl font-black mb-8">Nossa Seleção</h2>
            <div className="w-32 h-[1px] bg-accent/30 mx-auto"></div>
          </div>

          <div className="flex justify-center gap-4 mb-20 reveal-item overflow-x-auto pb-6 no-scrollbar">
            {(['pizzas', 'carnes', 'coquetelaria'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
                  activeCategory === cat ? 'bg-accent text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'border border-slate-700 text-slate-400 hover:border-accent/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredMenu.map((item) => (
              <div key={item.id} className="reveal-item group">
                <div className="relative overflow-hidden mb-8 aspect-[4/5] rounded-sm shadow-xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <span className="text-accent text-xl font-bold font-serif">{item.price}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-serif mb-3 group-hover:text-accent transition-colors italic">{item.name}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">{item.description}</p>
                <div className="w-10 h-[2px] bg-accent/20 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-28 reveal-item">
             <div className="relative bg-gradient-to-br from-slate-900 to-[#8B4513]/30 p-12 md:p-20 rounded-sm border border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                   <Sparkles size={180} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                   <div className="max-w-2xl">
                      <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif italic">Harmonização por IA</h3>
                      <p className="text-slate-300 text-lg font-light leading-relaxed">
                        Sinta-se à vontade para pedir uma sugestão. Nossa inteligência artificial analisa o clima de Maringá e suas preferências para sugerir a pizza e o vinho perfeitos.
                      </p>
                      {aiRecommendation && (
                        <div className="mt-8 p-6 bg-black/50 border-l-4 border-accent text-slate-200 italic font-light text-base leading-relaxed animate-in fade-in slide-in-from-left duration-700">
                          "{aiRecommendation}"
                        </div>
                      )}
                   </div>
                   <button 
                      onClick={handleAiRecommendation} 
                      disabled={isAiLoading} 
                      className="shrink-0 bg-accent text-slate-950 px-12 py-5 rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:scale-105 transition-all disabled:opacity-50 shadow-2xl"
                   >
                      {isAiLoading ? "Consultando Sommelier..." : "Sugerir Agora"}
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="contato" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1 space-y-12 reveal-item">
               <div>
                 <span className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Localização</span>
                 <h2 className="text-5xl font-black mb-8 leading-tight">Maringá <br/><span className="text-accent italic font-serif">é a nossa casa.</span></h2>
                 <p className="text-slate-400 text-lg font-light mb-10">O Casarão está estrategicamente posicionado na Zona 01, facilitando o seu acesso ao melhor da gastronomia.</p>
                 <div className="space-y-8">
                   <div className="flex items-start gap-5">
                     <MapPin className="text-accent shrink-0 mt-1" size={28} />
                     <p className="text-sm font-medium leading-relaxed">
                        Av. XV de Novembro, 492 - Zona 01<br />
                        Maringá - PR, 87013-230
                     </p>
                   </div>
                   <div className="flex items-start gap-5">
                     <Clock className="text-accent shrink-0 mt-1" size={28} />
                     <p className="text-sm font-medium leading-relaxed">
                        Terça a Domingo: 18:30 às 23:30<br />
                        <span className="text-accent font-bold">Finais de semana até 00:30</span>
                     </p>
                   </div>
                 </div>
               </div>
               <button className="w-full bg-[#8B4513] text-white py-6 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-accent hover:text-slate-950 transition-all shadow-2xl rounded-sm">
                 Abrir no Google Maps
               </button>
            </div>
            
            <div className="lg:col-span-2 h-[600px] rounded-sm overflow-hidden border border-white/10 relative shadow-2xl reveal-item">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.050414445839!2d-51.9377478!3d-23.4226343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd6e3e571408d%3A0x673c6838a3d368e7!2sCasar%C3%A3o%20da%20XV!5e0!3m2!1spt-BR!2sbr!4v1715874245612!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) brightness(0.9) invert(0.9)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-8 right-8 p-6 bg-slate-950/90 backdrop-blur-md rounded-sm border border-accent/30 shadow-2xl">
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-accent">Ambiente Histórico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-20">
            <div className="text-center md:text-left space-y-4">
              <span className="text-4xl font-logo text-accent mb-2 block logo-smoke">Casarão</span>
              <p className="text-slate-600 text-[10px] tracking-[0.4em] uppercase font-bold">Desde 2009 • Tradição Maringaense</p>
            </div>
            <div className="flex gap-12">
               <a href="#" className="text-slate-500 hover:text-accent transition-all transform hover:scale-110"><Instagram size={28} /></a>
               <a href="#" className="text-slate-500 hover:text-accent transition-all transform hover:scale-110"><MessageSquare size={28} /></a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5 text-[10px] text-slate-700 uppercase tracking-[0.3em] font-bold">
            <p>© {new Date().getFullYear()} Casarão da XV • Todos os direitos reservados.</p>
            <div className="flex items-center gap-2">
              <span>Handcrafted by</span>
              <span className="text-slate-500">Vibe Studio Design</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-5">
        <a href="https://wa.me/554430200000" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-5 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300">
          <MessageSquare size={28} />
        </a>
        <a href="#" className="bg-[#EA1D2C] text-white p-5 rounded-full shadow-[0_0_30px_rgba(234,29,44,0.3)] hover:scale-110 transition-transform duration-300">
          <Pizza size={28} />
        </a>
      </div>
    </div>
  );
};

export default App;
