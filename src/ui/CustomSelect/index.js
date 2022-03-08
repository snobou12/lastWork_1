import React from "react";
import Select from 'react-select'

export const CustomSelect =({options, placeholder, onChange, value, placeholderGap}) => {

    const defaultStyles = {
        option: () => ({
            color: "#666",
            padding: 20,
            fontSize: 15,
            // borderBottom: "0.1px solid grey",
            width: "100%",
            display: "flex",
          }),
          singleValue: () => ({
            color: "#000",
            fontSize: 15,
            paddingLeft: 25,
          }),
          control: (provided) => ({
            ...provided,
            height: '60px',
            marginTop: '5px',
            borderColor: '#e5e5e5',
            borderRadius: 4,
            fontSize: 15,
            width: "100%",
          }),
            placeholder: (provided) => {
                const color = '#8A8A8A';
                const paddingLeft = 25;
                const marginTop = 5;

                return {
                    ...provided,
                    color,
                    paddingLeft,
                    marginTop
                }
            },
          // placeholder: () => ({
          //     color: '#8A8A8A',
          //     paddingLeft: 25,
          // }),
          container: (provided) => ({
            ...provided,
            width: "100%"
          }),
          menu: (provided) => ({
            ...provided,
             top: '52px',
              zIndex: 2
          }),
          valueContainer: (provided) => ({
              ...provided,
              display: "flex",
              width: "100%",
              'input[aria-readonly="true"]': {
                  height: 0,
              }

          })
      };
    const currentValue = options?.find(option => option.value === value);

  return <Select
            options={options}
            components={{
                IndicatorSeparator: () => null,
              }}
              isSearchable={false}
            //name={input.name}
            onChange={onChange}
            placeholder={placeholder}
            styles={defaultStyles}
            value={currentValue}
            //className={styles.selectItem}
            //inputValue={this.state.inputValue}
            //onInputChange={this.onInputChange}
          />
}
