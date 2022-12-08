import React from 'react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import styles from './App.module.css';
import leftArrowImage from './assets/leftarrow.png';
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
      toast.error('Preencha todos os campos!');
    }
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.includes('.') && e.target.value.length > 2) {
      setHeightField(+e.target.value / 100)
    } else {
      setHeightField(+e.target.value)
    }
  }

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.includes('.') && e.target.value.length > 3) {
      setWeightField(+e.target.value / 100)
    } else {
      setWeightField(+e.target.value)
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };

  return (
    <div className={styles.main}>
      <Toaster position='top-center' reverseOrder={false} />
      <header>
        <div className={styles.headerContainer}>
          <h3>
            Feito por{' '}
            <a
              href='https://www.linkedin.com/in/lucas-cavalheri/'
              target='_blank'
            >
              Lucas Cavalheri.
            </a>
          </h3>
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
            // onChange={({ target }) =>
            //   setHeightField(target.valueAsNumber /* +target.value */)
            // }
            onChange={handleHeight}
            disabled={toShow ? true : false}
            data-testid='input-height'
          />
          <input
            type='number'
            placeholder='Digite o seu peso. Ex: 60.0 (em kg)'
            value={weightField > 0 ? weightField : ''}
            // onChange={({ target }) =>
            //   setWeightField(+target.value /* target.valueAsNumber */)
            // }
            onChange={handleWeight}
            disabled={toShow ? true : false}
            data-testid='input-weight'
          />
          <button
            onClick={handleCalculateButton}
            disabled={toShow ? true : false}
            data-testid='button-calcular'
          >
            Calcular
          </button>
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
              <div className={styles.rightArrow} onClick={handleBackButton} data-testid="back-arrow">
                <img src={leftArrowImage} alt='' width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
