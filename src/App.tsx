import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import GridItem from './components/GridItem/GridItem';
import { calculateImc, Level, levels } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Digite todos os campos.');
    }
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='' width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela
            Organização Mundial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>
          <input
            type='number'
            placeholder='Digite a sua altura. Ex: 1.65 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={({ target }) =>
              setHeightField(target.valueAsNumber /* +target.value */)
            }
          />
          <input
            type='number'
            placeholder='Digite o seu peso. Ex: 60.0 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={({ target }) =>
              setWeightField(+target.value /* target.valueAsNumber */)
            }
          />
          <button onClick={handleCalculateButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((el, i) => (
                <GridItem key={i} item={el} />
              ))}
            </div>
          )}
          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow}></div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
