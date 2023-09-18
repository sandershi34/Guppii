import * as React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"


export default function Search({ navigation }) {
  const {control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => console.log(data)
  return (
    <View>
      <Controller
        control={control}
        render={({onChange,onBlur,value}) => (
          <TextInput
            style = {styles.inputstyle}
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}          
          />
        )}
        name="name"
        rules={{required:true}}
        defaultValue=""
      />
      <TouchableOpacity style={styles.buttonstyle} title="Find" onPress={handleSubmit((data)=>{console.log(data)})}><Text>Submit</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputstyle: {
    width: "60%",
    marginLeft:"20%",
    padding: 5,
    marginTop: "10%",
    borderRadius: 6,
    backgroundColor: "white",
  },
  buttonstyle:{
    width: "16%",
    marginLeft:"42%",
    padding: 5,
    marginTop: "3%",
    borderRadius: 6,
    color: "white",
    backgroundColor: "#3399ff",
  },

});