
import React, {useState, useEffect} from "react";
import {Card, Form} from 'react-bootstrap';
import { BarChart } from "./Charts";
import { filterDate } from "../data/charts";
import { getFilterProductByDate } from "../services/products";

const ProductChart = (props) => {
  const { title, products } = props;
  const [total, setTotal] = useState(0);
  const [state, setState] = useState(null);
  const series = (state && state.data.map(d => d.value)) || [];

  useEffect(() => {
    if(state && state.data && state.data.length > 0) {
      let sum = 0;
      state.data.forEach(pd => {
        sum += pd.sumProduct;
        setTotal(sum);
      });
    }
  }, [props.products, state])

  const onSelectedDate = (ev) => {
    ev.preventDefault();
    setState(getFilterProductByDate(products, ev.target.value));
  }

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <h6 className="fw-normal text-gray mb-2">{title}</h6>
          <h3>{total}</h3>
          <Form>
            <Form.Group id="frameworks" className="mb-3">
              <Form.Label>Filter</Form.Label>
              <Form.Select className="pr-4" onChange={(ev) => onSelectedDate(ev)}>
                <option defaultValue>Filter</option>
                {filterDate.map((data, index) => (
                  <option 
                    key={`filter-${index}`}
                    value={data.value}
                  >
                    {data.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
        <div className="d-block ms-auto">
          {state && state.data && state.data.map((d, index) => (
            <div key={`bar-element-${index}`} className="d-flex align-items-center text-end mb-2">
              <span className={`shape-xs rounded-circle me-2`} style={{backgroundColor:`rgb(${d.color})`}}/>
              <small className="fw-normal">{d.sumProduct} product</small>
            </div>
          ))}
        </div>
      </Card.Body>
      {state && state.data && <Card.Body className="p-2 overflow-auto">
        <BarChart labels={state.labels} series={series} />
      </Card.Body>}
    </Card>
  );
}

export default ProductChart
