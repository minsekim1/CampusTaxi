import React, {Component} from 'react';
import { View, Text, Platform, StyleSheet, Button } from 'react-native'
import WebView from 'react-native-webview';


export default class WebLogin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: this.props.route.params.uri
        }
    }

    webViewEnd = async (event, props) => {
        const result = JSON.parse(event.nativeEvent.data);
        console.log("result",result);
        if (result.status === 'success') {
            // 성공적 네이버 로그인 완료
            alert(`token: ${result.token}`)
            props.route.params.login(result.token)
        } else {
            props.route.params.loginFail()
        }

        props.navigation.pop();
    }

    render(){
        const props = this.props        

        return(
            <View style={styles.container}>
                <WebView
                    ref={ref=> (this.webview = ref)}
                    source={{uri:this.state.url}}
                    useWebKit={true} 
                    onMessage={(event) => this.webViewEnd(event, props)}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})