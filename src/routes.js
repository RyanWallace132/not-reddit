import {Switch, Route, Redirect} from 'react-router-dom'
import React from 'react'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Post from './Components/Post/Post'
import Form from './Components/Form/Form'




export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/post/:postid' component={Post}/>
        <Route path='/new' component={Form}/>
        <Route exact render={() => <Redirect to ="/" />} />
    </Switch>

)