"use client";

import { useEffect, useState } from "react";

const IMG = {
  hero: "/hero-lapaz.jpg",
  city: "https://static.wixstatic.com/media/108ff4_d5558958600c4c2ca93334fa0a1c80ad~mv2.jpg/v1/fill/w_1800,h_1100,al_c,q_90/108ff4_d5558958600c4c2ca93334fa0a1c80ad~mv2.jpg",
  food: "/food-saltenas.jpg",
  street: "https://www.the-wanderlusters.com/wp-content/uploads/2015/04/La-Paz-Shopping-Street-Bolivia-Wanderlusters-750x500.jpg",
  cable: "https://conteudo.imguol.com.br/c/entretenimento/70/2021/12/28/teleferico-em-la-paz-bolivia-1640722639064_v2_4x3.jpg",
  hills: "https://d2xsxph8kpxj0f.cloudfront.net/310519663145625555/4ZktLNxQHgJReWe7Bns4zn/images/la-paz-sehenswuerdigkeiten.webp",
};

const stories = [
  { tag: "Noticias", title: "La Paz, entre las mejores ciudades para visitar este año", text: "Una ciudad que se entiende desde la altura.", image: IMG.city },
  { tag: "Experiencias", title: "5 experiencias imperdibles que solo existen aquí", text: "Rituales cotidianos, sabores y nuevas miradas.", image: IMG.food },
  { tag: "Guía", title: "Qué hacer en La Paz este fin de semana", text: "Una agenda para vivir la ciudad a tu ritmo.", image: IMG.street },
];

const districts = [
  ["Sopocachi", "Cafés, cultura y vida urbana.", IMG.street],
  ["Centro", "Historia, comercio y movimiento.", IMG.city],
  ["El Alto", "Feria, horizonte y potencia.", IMG.cable],
  ["Zona Sur", "Otra forma de vivir la ciudad.", IMG.hills],
];

function SearchIcon() { return <span className="search-icon" aria-hidden="true" />; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <header className="header">
        <a className="logo" href="#inicio" aria-label="How To La Paz, inicio"><img src="/how-to-la-paz.png" alt="How To La Paz" /></a>
        <nav className={menuOpen ? "desktop-nav open" : "desktop-nav"} aria-label="Navegación principal">
          {['Explora', 'Noticias', 'Guía de barrios', 'Eventos', 'Sobre La Paz'].map((item) => <a href="#" key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="head-actions">
          <button aria-label="Buscar"><SearchIcon /></button>
          <button className="hamburger" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image"><img src={IMG.hero} alt="Teleférico sobre La Paz con el Illimani al fondo" /></div>
        <div className="hero-copy">
          <h1>Descubre<br />La Paz<br />como un paceño</h1>
          <p>Historias, lugares y experiencias para vivir una ciudad más increíble de lo que imaginas.</p>
          <a className="orange-button" href="#lo-ultimo">Explorar La Paz <span>→</span></a>
        </div>
        <div className="hero-index"><span>16° 29′ S</span><span>3.600 M</span></div>
      </section>

      <section className="latest section reveal" id="lo-ultimo">
        <div className="title-row"><div><p className="micro orange">RECIÉN PUBLICADO</p><h2>Lo último</h2></div><a className="simple-link" href="#">Ver todas <span>→</span></a></div>
        <div className="story-grid">
          {stories.map((story) => <article className="story-card" key={story.title}>
            <a href="#" className="story-image"><img src={story.image} alt="" /></a>
            <div className="story-body"><p className="micro">{story.tag}</p><h3><a href="#">{story.title}</a></h3><p>{story.text}</p><a href="#" className="read">Leer más <span>→</span></a></div>
          </article>)}
        </div>
      </section>

      <nav className="topics" aria-label="Temas">
        {['Gastronomía', 'Cultura', 'Lugares', 'Eventos', 'Barrios', 'Naturaleza', 'Vida nocturna'].map((item) => <a href="#" key={item}>{item}</a>)}
      </nav>

      <section className="featured section reveal">
        <div className="featured-photo"><img src={IMG.street} alt="Vida cotidiana en una calle paceña" /></div>
        <article><p className="micro orange">HISTORIA DESTACADA · CULTURA</p><h2>El alma de La Paz está en sus calles</h2><p>Entre pendientes imposibles, mercados y conversaciones al paso, la ciudad se revela en una coreografía cotidiana que no aparece en las postales.</p><a className="simple-link" href="#">Leer historia <span>→</span></a></article>
      </section>

      <section className="districts section reveal">
        <div className="title-row"><div><p className="micro orange">ZONA POR ZONA</p><h2>Explora La Paz<br />por barrios</h2></div><p className="section-intro">Cada zona tiene una forma diferente<br />de vivir la ciudad.</p></div>
        <div className="district-grid">{districts.map(([name, desc, image], index) => <a className={`district d${index + 1}`} href="#" key={name}><img src={image} alt={`Vista de ${name}`} /><span><strong>{name}</strong><small>{desc}</small></span></a>)}</div>
      </section>

      <section className="agenda section reveal">
        <div className="agenda-heading"><p className="micro orange">AGENDA CULTURAL</p><h2>Esta semana<br />en La Paz</h2><a className="simple-link inverse" href="#">Ver agenda completa <span>→</span></a></div>
        <div className="event-list">
          {[['17', 'AGO', 'Festival de Música Independiente', 'Teatro Nuna · 19:30'], ['18', 'AGO', 'Feria gastronómica', 'Sopocachi · 11:00'], ['20', 'AGO', 'Exposición de fotografía', 'Museo Nacional de Arte · 18:30']].map(([day, month, title, place]) => <a href="#" className="event" key={title}><time><b>{day}</b><span>{month}</span></time><span><strong>{title}</strong><small>{place}</small></span><i>↗</i></a>)}
        </div>
      </section>

      <section className="photo-story reveal">
        <img src={IMG.city} alt="Panorámica de La Paz al amanecer" />
        <div><p className="micro">DESDE NUESTRA MIRADA · PHOTO ESSAY 01</p><h2>Una mañana sobre<br />los 3.600 metros.</h2><p>La primera luz toca los ladrillos y revela una ciudad suspendida entre la tierra y el cielo.</p><a className="simple-link inverse" href="#">Ver historia fotográfica <span>→</span></a></div>
      </section>

      <section className="discover section reveal">
        <div className="title-row"><div><p className="micro orange">RECOMENDACIONES LOCALES</p><h2>Más allá de lo turístico</h2></div></div>
        <div className="discover-grid">
          {[["Mercados que vale la pena conocer", IMG.food], ["Miradores que pocos visitan", IMG.hills], ["Dónde escuchar música en vivo", IMG.cable]].map(([title, image], i) => <a href="#" key={title}><div><img src={image} alt="" /></div><p className="micro">0{i + 1}</p><h3>{title}</h3><span>Descubrir →</span></a>)}
        </div>
      </section>

      <section className="social section reveal"><div><p className="micro orange">LA PAZ, TODOS LOS DÍAS</p><h2>@howtolapaz</h2><p>Más historias de La Paz, todos los días.</p><a className="simple-link" href="#">Seguir en Instagram <span>↗</span></a></div><div className="social-grid">{[IMG.hero, IMG.street, IMG.food, IMG.cable].map((image) => <a href="#" key={image}><img src={image} alt="Fotografía de la comunidad How To La Paz" /></a>)}</div></section>

      <footer><div className="footer-main"><img src="/how-to-la-paz.png" alt="How To La Paz" /><p>Una forma diferente de<br />descubrir la ciudad.</p><nav>{['Explora', 'Noticias', 'Agenda', 'Barrios', 'Sobre nosotros', 'Contacto'].map((item) => <a href="#" key={item}>{item}</a>)}</nav><nav>{['Instagram ↗', 'Facebook ↗', 'TikTok ↗'].map((item) => <a href="#" key={item}>{item}</a>)}</nav></div><div className="footer-line"><span>© 2026 HOW TO LA PAZ</span><span>HECHO A 3.600 M</span><a href="#inicio">VOLVER ARRIBA ↑</a></div></footer>

      <nav className="mobile-tabs" aria-label="Navegación móvil"><a className="active" href="#inicio"><b>⌂</b>Inicio</a><a href="#lo-ultimo"><b>⌕</b>Explora</a><a href="#"><b>□</b>Eventos</a><a href="#"><b>◇</b>Guía</a><a href="#"><b>♡</b>Favoritos</a></nav>
    </main>
  );
}
