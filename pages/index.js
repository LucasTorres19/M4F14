import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <Head>
        <title>M4FI4</title>
        <meta name="description" content="La M4F14 del graifesito es una comunidad de jugadores y programadores re capos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          M4F14 del Gr4fesito
        </h1>
        
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Juegos &rarr;</h2>
            <p>Diviertete probando nuestros videojuegos</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Promesa &rarr;</h2>
            <p>La Proxima promesa del M4F14</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Proyectos &rarr;</h2>
            <p>
              Prueba los proyectos que han sido creados por la M4F14.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Jugador del año &rarr;</h2>
            <p>
              Descubre los mejores jugadores del año, y vota por tu favorito.
            </p>
          </a>

          <a
            href="/plays"
            className={styles.card}
          >
            <h2>Mejores jugadas &rarr;</h2>
            <p>
              Mira las mejores jugadas y aprende a jugar maldito malo.
            </p>
          </a>

          <a
            href="https://twitter.com/LucasTorres112"
            className={styles.card}
          >
            <h2>Galería de arte &rarr;</h2>
            <p>
              Contempla los dibujazos de Lucas, Juan y sus amigos.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Cementerio &rarr;</h2>
            <p>
              Llora por los difuntos de la M4F14. (¿Qué esperas?)
            </p>
          </a>
          <a
            href="/chismes"
            className={styles.card}
          >
            <h2>Chismes &rarr;</h2>
            <p>
              Averigua porque está pepe en el cementerio.
            </p>
          </a>
        </div>
        
      </main>

    </div>
  )
}
