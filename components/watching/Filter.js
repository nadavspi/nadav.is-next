import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  margin-bottom: 3rem;
`;

const Toggle = styled.label`
  margin-right: 1rem;
`;

const Input = styled.input`
  margin-right: 0.3rem;
`;

const Filter = ({ allFilters, currentFilter, setFilter }) => {
  const toggle = (value) => {
    if (currentFilter.includes(value)) {
      setFilter(currentFilter.filter((v) => v !== value));
    } else {
      setFilter([...currentFilter, value]);
    }
  };
  return (
    <Form>
      <fieldset>
        <legend>Filter by type</legend>
        {allFilters.map((value) => {
          const isChecked = currentFilter.includes(value);
          return (
            <Toggle key={value}>
              <Input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(value)}
              />
              {value}
            </Toggle>
          );
        })}
      </fieldset>
    </Form>
  );
};

export default Filter;
