import { typeFilter } from "../data/charts";
import moment from "moment";
import { isNil } from "lodash";

export const formatDate = (date) => {
  const momentDate = date ? moment(date) : moment();
  return momentDate.format("DD-MM-YYYY");
}

export const getDate = (date) => moment(date).format("YYYY-MM-DD");

export const formatFilterProduct = (products, fromDate, toDate) => {
  const formatFromDate = getDate(fromDate);
  const formatToDate = getDate(toDate);
  const productsFilter = products.filter(product => 
    moment(product.date, "DD-MM-YYYY")
    .isBetween(getDate(fromDate.subtract(1, "days")), formatToDate));
  return {
    fromDate: formatDate(formatFromDate),
    toDate: formatDate(formatToDate),
    productsFilter: productsFilter
  }
}

export const getArrDate = (fromDate, toDate) => {
  if(fromDate === toDate) {
    return [toDate];
  }
  let isEqual = true;
  let result = [fromDate];
  let nextDay = fromDate;
  while(isEqual) {
    nextDay = formatDate(moment(nextDay, "DD-MM-YYYY").add(1, "days"));
    result.push(nextDay);
    if(nextDay === toDate) {
      isEqual = false;
    }
  }
  return result;
}

export const getFilterProductByDate = (products, type, startDate, endDate) => {
  if(products.length === 0) {
    return;
  }

  let result = {};
  switch(type) {
    case typeFilter.today:
      const today = formatDate();
      const productsFilter = products.filter(product => product.date === today) || [];

      result = {
        fromDate: today,
        toDate: today,
        productsFilter: productsFilter
      }
      break;
    case typeFilter.week:
      result = formatFilterProduct(
        products, 
        moment().startOf("isoWeek"),
        moment().endOf("isoWeek")
      );
      break;
    case typeFilter.month:
      result = formatFilterProduct(
        products, 
        moment().startOf("month"),
        moment()
      );
      break;
    case typeFilter.custom:
      result = formatFilterProduct(
        products, 
        moment(startDate, "DD/MM/yyyy"),
        moment(endDate, "DD/MM/yyyy")
      );
      break;
    default:
      break;
  }
  if(result.productsFilter && result.productsFilter.length > 0) {
    const axisY = getArrDate(result.fromDate, result.toDate);
    let productsChart = [];
    // loop date
    axisY.reduce((total, currValue, index) => {
      // loop value
      for(let product of result.productsFilter) {
        const indexProduct = productsChart.findIndex((item) => item.color === product.color);
        if(indexProduct >= 0) {
          let nowValue = productsChart[indexProduct].value[index];
          if(nowValue === 0 || isNil(nowValue)) {
            nowValue = !isNil(product.value) && product.date === currValue ? product.value : 0;
          }
          productsChart[indexProduct].value[index] = nowValue;
          productsChart[indexProduct].sumProduct += parseInt(nowValue);
        } else {
          const numberProduct = !isNil(product.value) && product.date === currValue ? product.value : 0;
          let firstProduct = {
            label: product.color,
            color: product.color,
            fromDate: result.fromDate,
            toDate: result.toDate,
            sumProduct: parseInt(numberProduct),
            value: [numberProduct]
          }
          productsChart.push(firstProduct);
        }
      }
      return total;
    }, []);
    if(productsChart.length > 0) {
      productsChart.forEach((item, index) => {
        cssVar(`--ct-chart-${index}`, `rgb(${item.color})`);
      })
    }
    return {
      labels: axisY,
      data: productsChart
    }
  }
}

export const cssVar = (name, value) => {
  if (!name) return console.warn("no `name` passed to cssVar()");
  let cleanedName = (name + "").trim();
  let cleanedValue = (value + "").trim();

  // remove any parenthesis, eg: var(--myName) -> --myName
  const match = cleanedName.match(/\(([^()]+)\)/g);
  if (match && match.length > 0) {
    cleanedName = match[0].replace(/^[^(]*\(/, "").replace(/\)[^(]*$/, "");
  }

  // prepend double hyphen if not existant
  cleanedName =
    cleanedName.slice(0, 2) !== "--" ? `--${cleanedName}` : cleanedName;

  // stop here; nothing found for var
  if (cleanedName && !value) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(cleanedName)
      .trim();
  } else {
    return document.documentElement.style.setProperty(
      cleanedName,
      cleanedValue
    );
  }
};