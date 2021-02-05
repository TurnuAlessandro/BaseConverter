import "./styles.css";
import { useState } from "react";

function validateData(number, basePartenza, baseArrivo) {
  let arrayPartenza = Array.from(String(number), Number);
  var returnData = [];

  if (baseArrivo > 10 || basePartenza > 10) {
    returnData.push(
      <div className="p-3 mb-2 bg-danger text-white">
        Non so ancora lavorare con basi maggiori di <b>10</b>
      </div>
    );
  }

  for (var digit of arrayPartenza) {
    if (digit >= basePartenza) {
      returnData.push(
        <div className="p-3 mb-2 bg-danger text-white">
          Il numero che hai inserito non può essere in base {basePartenza}
        </div>
      );
      return returnData;
    }
  }

  return returnData;
}

function fromXto10(number, base) {
  /* INIZIO da base basePartenza a 10 */
  let arrayPartenza = Array.from(String(number), Number);

  const procedimento1 = arrayPartenza.map((digit, index) => [
    <li key={index}>
      {digit} x {base}^{arrayPartenza.length - index - 1} ={" "}
      {digit * Math.pow(base, arrayPartenza.length - index - 1)}
    </li>,
    digit * Math.pow(base, arrayPartenza.length - index - 1)
  ]);

  var res = 0;
  for (var el of procedimento1) {
    res += el[1];
  } /* FINE da base basePartenza a 10 */

  return {
    risultato: res,
    procedimento: procedimento1,
    risultatoEsteso: (
      <div className="margine-destro">
        {procedimento1.map((el, index) => {
          if (index === procedimento1.length - 1) {
            return (
              <span key={index}>
                <b>{el[1]}</b> ={" "}
              </span>
            );
          } else {
            return (
              <span key={index}>
                <b>{el[1]}</b> +{" "}
              </span>
            );
          }
        })}
        {res} (in base 10)
      </div>
    )
  };
}

function from10toY(number, base) {
  /* INIZIO da base 10 a baseArrivo */
  let resti = [];
  let procedimento2 = [
    <tr key={Math.random()} className="riga font-weight-bold">
      <td className="padding align-right border-right pr-4 text-">Quozienti</td>
      <td className="padding align-right pl-4">Resti</td>
    </tr>
  ];
  while (number > 0) {
    resti.unshift(number % base);
    procedimento2.push(
      <tr key={Math.random()} className="riga ">
        <td className="padding align-right border-right pr-4">
          {number} / {base} = <i>{Math.trunc(number / base)}</i>
        </td>
        <td className="padding align-right pl-4">
          {number} % {base} = <b>{number % base}</b>
        </td>
      </tr>
    );
    number = Math.trunc(number / base);
  }
  /* FINE   da base 10 a baseArrivo */
  return {
    risultato: resti,
    procedimento: procedimento2
  };
}

export default function App() {
  let [numPartenza, changeNumPartenza] = useState(123456);
  let [basePartenza, changeBasePartenza] = useState(7);
  let [baseArrivo, changeBaseArrivo] = useState(4);

  let firstStep = fromXto10(numPartenza, basePartenza);

  let secondStep = from10toY(firstStep.risultato, baseArrivo);

  return (
    <div className="App p-2 container ">
      <div className="row">
        <div className="col-0 col-md-1"></div>
        <div className="col-12 col-md-10">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                Numero{" "}
              </span>
            </div>
            <input
              className="form-control"
              type="number"
              onChange={() => {
                var val = document.getElementById("numeroPartenza").value;
                changeNumPartenza(val > 0 ? val : 10);
              }}
              id="numeroPartenza"
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                <span className="font-weight-bold mr-1">da</span>
                base
              </span>
            </div>
            <input
              className="form-control"
              type="number"
              onChange={() => {
                var val = document.getElementById("basePartenza").value;
                changeBasePartenza(val > 0 ? val : 10);
              }}
              id="basePartenza"
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                <span className="font-weight-bold mr-1">a</span>
                base
              </span>
            </div>
            <input
              className="form-control"
              type="number"
              onChange={() => {
                var val = document.getElementById("baseArrivo").value;
                changeBaseArrivo(val > 0 ? val : 10);
              }}
              id="baseArrivo"
            />
          </div>

          <table className="table table-dark">
            <tr>
              <td>Numero partenza</td>
              <td>{numPartenza}</td>
            </tr>
            <tr>
              <td>Base partenza</td>

              <td>{basePartenza}</td>
            </tr>
            <tr>
              <td>Base arrivo</td>
              <td>{baseArrivo}</td>
            </tr>
            <tr>
              <th>Risultato</th>
              <th>{secondStep.risultato}</th>
            </tr>
          </table>
          <br />
          <br />
          <div>{validateData(numPartenza, basePartenza, baseArrivo)}</div>
          <br />
          <br />
          <div>
            <p className="text-light bg-success p-2">
              1) Conversione di {numPartenza} da base {basePartenza} a base 10
            </p>{" "}
            <div className="margine-destro">
              {firstStep.procedimento.map((el, index) => el[0])}
            </div>
            <br />
            {firstStep.risultatoEsteso}
            <br />
            <br />
          </div>

          <div>
            <p className="text-light bg-success p-2">
              2) Conversione di {firstStep.risultato} da base 10 a base{" "}
              {baseArrivo}
            </p>

            <table className="margine-destro">{secondStep.procedimento}</table>
            <br />
            <p className="text-light bg-success p-2">
              3) Risultato{" "}
              <u>
                <b>{secondStep.risultato}</b>
              </u>{" "}
              (in base {baseArrivo})
            </p>
          </div>
        </div>
        <div className="col-0 col-md-1"></div>
      </div>
    </div>
  );
}
