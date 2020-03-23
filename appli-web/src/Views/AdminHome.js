import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { green, blue, red , white} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getAllPostsFromDb} from '../API/PostApi'
import {getAllUsersFromDb} from '../API/UserApi'
import {getAllCommentFromPost} from '../API/CommentApi'
import {getAllReportFromPost} from '../API/ReportApi'
import {getPostByUser} from '../API/PostApi'
import {getAllCommentFromUser} from '../API/CommentApi'
import {getAllReportFromUser} from '../API/ReportApi'
import {getUserFromDb} from '../API/UserApi'
import {getAllCommentFromDb} from '../API/CommentApi'
import {getPostById} from '../API/PostApi'
import {getAllReportFromComment} from '../API/ReportApi'
import AdminTablePost from '../Views/AdminTablePost'
import AdminTableUser from '../Views/AdminTableUser'
import AdminTableComment from '../Views/AdminTableComment'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = theme => ({
  mainPage: {
    boxShadow: "10px 10px 10px #9E9E9E",
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    color:'black',
  },
  filterView: {
  },
  actionProfileView: {
    backgroundColor:"red",
  },
  listView: {
  },
  table: {
    minWidth: 650,
  },
  nomColonne: {
    fontWeight: "bold",
    fontSize: 20,
  },
  table: {

  },
  buttonMenu: {
    backgroundColor:"#CFCECD",
    color:"black",
    marginTop:50,
    width:200,
    "&:hover": {
     background: "#B7B7B6"
   },

  },
});



class AdminHome extends React.Component {
  state = {
    display: ""
  }

  constructor(props){
    super(props)
    console.log("Entre dans le constructeur")

    getAllCommentFromDb().then(resComments => {
      var commentsGlobal = resComments
        for(let i=0;i<commentsGlobal.length;i++){
          if(commentsGlobal[i].titreCom.length > 0 ) {
            commentsGlobal[i].titreCom = commentsGlobal[i].titreCom[0].toUpperCase() + commentsGlobal[i].titreCom.slice(1)
          }
          Object.assign(commentsGlobal[i], {reports: 0});
            getAllReportFromComment(commentsGlobal[i]._id).then(reports => {
              if(reports.length>0) {

                commentsGlobal[i].reports=reports.length
              }

          }).catch((error) => {
            console.log("Erreur dans le constructeur 1")
          })
        }




        getAllPostsFromDb().then(listPosts => {
          var postsGlobal = listPosts

            for(let i=0;i<postsGlobal.length;i++){

              if(postsGlobal[i].titre.length > 0 ) {
                postsGlobal[i].titre = postsGlobal[i].titre[0].toUpperCase() + postsGlobal[i].titre.slice(1)
              }

              Object.assign(postsGlobal[i], {reports: 0});

                getAllReportFromPost(postsGlobal[i]._id).then(reports => {
                  if(reports.length>0) {
                    postsGlobal[i].reports=reports.length
                  }

                }).catch((error) => {
                  console.log("Erreur dans le constructeur reports")
                })


            }


            getAllUsersFromDb().then(listUsers => {
              var usersGlobal = listUsers
                for(let i=0;i<usersGlobal.length;i++){


                      getAllReportFromUser(usersGlobal[i].email).then(reports => {
                        Object.assign(usersGlobal[i], {reports: 0});
                        if(reports!=null) {
                          usersGlobal[i].reports=reports.length
                        }

                        var action = { type: "TOGGLE_ADMIN_INFOS", listInfos: {posts:postsGlobal,comments:commentsGlobal,users:usersGlobal }}
                        this.props.dispatch(action)

                      }).catch((error) => {
                        console.log("Erreur dans le constructeur reports user")
                      })
                }


            }).catch((error) => {
              console.log(error)
              console.log("Erreur dans le constructeur")
            })

        }).catch((error) => {
          console.log("Erreur dans le constructeur")
        })

    }).catch((error) => {
      console.log("Erreur dans le constructeur 2")
    })



  }

  render(){

    const {classes} = this.props


    function TableDisplay(props) {
      var afficher = props.afficher
      if(afficher == "posts") {
        return (<AdminTablePost />)
      }
      else if (afficher == "users"){
        return ( <AdminTableUser /> )
      }
      else {
        return ( <AdminTableComment /> )
      }
    }

    return (

      <div className={classes.mainPage}>
      <Grid container>



      <Grid item className={classes.listView} xs={12}>
      <TableDisplay afficher={this.props.pageToShow}/>

    </Grid>


    </Grid>
    </div>
  )
}
}

const mapStateToProps = state =>{
  return {
    pageToShow: state.adminPage.pageToShow,
    infosHome: state.adminHome.infos,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminHome))
