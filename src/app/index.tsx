import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState: {
    displayValue: string,
    clearDisplay: boolean,
    operation: string | null,
    values: number[],
    current: number,
} = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
};

export default function Index() {
    const [display, setDisplay] = useState(initialState);

    const addDigit = (n: string) => {
        const clearDisplay = display.displayValue === '0' || display.clearDisplay;
        if (n === '.' && !clearDisplay && display.displayValue.includes('.')) return;
        const currentValue = clearDisplay ? '' : display.displayValue;
        const displayValue = currentValue + n;

        if (n !== '.') {
            const newValue = parseFloat(displayValue);
            const values = [...display.values];
            values[display.current] = newValue;
            setDisplay({ ...display, displayValue, values, clearDisplay: false });
        } else {
            setDisplay({ ...display, displayValue, clearDisplay: false });
        }
    }

    const clearMemory = () => {
        setDisplay({ ...initialState });
    }

    const setOperation = (operation: string) => {
        const equals = operation === '=';
        if (display.current === 0) {
            setDisplay({ ...display, current: 1, clearDisplay: true, operation: equals ? null : operation});
        } else {
            const values = [ ...display.values ];
            try {
                values[0] = eval(`${values[0]} ${display.operation} ${values[1]}`);
            } catch (e) {
                values[0] = display.values[0];
            }


            values[1] = 0;
            setDisplay({
                displayValue: `${values[0]}`,
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: true,
                values
            })
        }
    }

    return (
        <View style={style.container}>
            <Display value={display.displayValue} />
            <View style={style.buttons}>
                <Button label='AC' triple onClick={clearMemory} />
                <Button label='/' operation onClick={setOperation} />
                <Button label='7' onClick={addDigit} />
                <Button label='8' onClick={addDigit} />
                <Button label='9' onClick={addDigit} />
                <Button label='*' operation onClick={setOperation}  />
                <Button label='4' onClick={addDigit} />
                <Button label='5' onClick={addDigit} />
                <Button label='6' onClick={addDigit} />
                <Button label='-' operation onClick={setOperation}  />
                <Button label='1' onClick={addDigit} />
                <Button label='2' onClick={addDigit} />
                <Button label='3' onClick={addDigit} />
                <Button label='+' operation onClick={setOperation}  />
                <Button label='0' double onClick={addDigit} />
                <Button label='.' onClick={addDigit} />
                <Button label='=' operation onClick={setOperation}  />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});