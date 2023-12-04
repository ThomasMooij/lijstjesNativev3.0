import React, { FC, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import TopNavigator from './TopNavigator'

interface Props {
    // loggedIn: boolean; 
  }

const AppNavigator: FC<Props> = () =>  {

    const [loggedIn, setLoggedIn] = useState(true)

    return (
        <NavigationContainer>
            {loggedIn ?  <TabNavigator /> : <AuthNavigator/>}
        </NavigationContainer>
    )
  }

  export default AppNavigator