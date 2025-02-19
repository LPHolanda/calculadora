import { StyleSheet, Text, View } from "react-native";

interface DisplayInterface {
    value: string;
}

export default function Display(props: DisplayInterface) {
    return (
        <View style={styles.display}>
            <Text style={styles.displayValue} numberOfLines={1}>
                {props.value}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end',
    },
    displayValue: {
        fontSize: 60,
        color: '#FFF'
    }
});