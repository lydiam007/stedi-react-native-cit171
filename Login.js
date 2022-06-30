import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

const sendText = async (phoneNumber) => {
    //using fetch do a POST to https://dev.stedi.me/twofactorlogin/5038967607
    console.log("Phone Number: ",phoneNumber);
    const loginResponse = await
    fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
        method: 'POST',
        headers: {
            'content-type':'application/text'
        }
    });
    const loginResponseText = await loginResponse.text(); //converts the promise to a string by using await
    console.log("Login Response",loginResponseText);//print the response
};

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn}) => {
    console.log("PhoneNumber: ", phoneNumber);
    const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin',{
        method: 'POST',
        body:JSON.stringify({oneTimePassword, phoneNumber}),
        headers: {
            'content-type':'application/json'
        }
    });

    const responseCode = tokenResponse.status;
    console.log("Response Status Code", responseCode);
    //if
        //setUserLoggedIn(true);
}
    const tokenResponseString = await tokenResponse.text;

    const token = await loginResponse.text();
    console.log(token);

};

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="1234567890"
      />
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
            getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn});
            console.log("Login Button was clicked")}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTo:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;