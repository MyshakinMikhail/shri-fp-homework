/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {
    __,
    allPass,
    gte,
    ifElse,
    length,
    lte,
    pipe,
    prop,
    split,
    tap,
    test,
} from "ramda";
import Api from "../tools/api";

const api = new Api();

const isValidLength = allPass([
    pipe(length, gte(__, 3)),
    pipe(length, lte(__, 9)),
]);

const containsOnlyDigitsAndPoint = test(/^[0-9.]+$/);

const hasSinglePoint = pipe(split("."), length, lte(__, 2));

const isPositive = pipe(parseFloat, (num) => !isNaN(num) && num > 0);

const isInputValid = allPass([
    isValidLength,
    containsOnlyDigitsAndPoint,
    hasSinglePoint,
    isPositive,
]);

const roundValue = Math.round;
const squareValue = (x) => x * x;

const fetchBinaryForm = (number) =>
    api
        .get("https://api.tech/numbers/base ")({
            from: 10,
            to: 2,
            number,
        })
        .then(prop("result"));

const fetchAnimalById = (id) =>
    api.get("https://animals.tech/ ")({ id }).then(prop("result"));

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const log = tap(writeLog);
    const onApiError = () => handleError("APIError");

    pipe(
        log,
        ifElse(
            isInputValid,
            (inputValue) => {
                const roundedValue = roundValue(parseFloat(inputValue));
                writeLog(roundedValue);

                fetchBinaryForm(roundedValue)
                    .then(log)
                    .then((binaryString) => binaryString.length)
                    .then(log)
                    .then(squareValue)
                    .then(log)
                    .then((squaredLength) => squaredLength % 3)
                    .then(log)
                    .then(fetchAnimalById)
                    .then(handleSuccess)
                    .catch(onApiError);
            },
            () => handleError("ValidationError")
        )
    )(value);
};

export default processSequence;
