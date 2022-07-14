import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

const sendText = async (phoneNumber) => {
    //using fetch do a POST to https://dev.stedi.me/twofactorlogin/5038967607
    await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber, {
        method: 'POST',
        headers: {'content-type':'application/text'}
    });
}
const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn, setUserName}) => {
    const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
        method: 'POST',
        body:JSON.stringify({oneTimePassword, phoneNumber, setUserName}),
        headers: {
            'content-type':'application/json'
        }
    });

    const responseCode = tokenResponse.status;
    console.log("Response Status Code", responseCode);
    if(responseCode===200) {
        setUserLoggedIn(true);}

        const tokenResponseString = await tokenResponse.text();
        console.log("Token", tokenResponseString);
        const emailResponse = await fetch("https://dev.stedi.me/validate/"+tokenResponseString)
        const textEmail = await emailResponse.text();
        setUserName(textEmail);
        console.log("User Email", textEmail);
}

  return (
    <SafeAreaView style={styles.marginTop}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="1234567890"
        placeholderTextColor='grey'
      />
    
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber);
        }}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor='grey'
        keyboardType="numeric"
        secureTextEntry={true}
      />
  
  <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          getToken({ phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn, setUserName:props.setUserName});
          }
        }
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );};
  const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;