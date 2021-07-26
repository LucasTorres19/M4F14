import styles from '../styles/Spinner.module.css'
export default function Spinner({width=100, height=100}){
    return (
        <div className={styles.Spinner} style={{width: `${width}px`, height: `${height}px` }} ></div>
    )
}