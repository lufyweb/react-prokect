import "./index.scss";
import {Nologin} from "~/components/nologin";
import {Islogin} from "~/components/isloginJinba";
export class Jinba extends Component {

  state = {
    show:false
  }
  componentWillMount(){
    if(localStorage.mobile){
      this.setState({
        show:true
      })
    }
  }
  render() {
    return (
     <div style={{width:"100%",overflow:"hidden"}}>
       
      {this.state.show?<Islogin/>:<Nologin/>}
     </div>
    )
  }
}
