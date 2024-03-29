import "./index.scss";
import PropTypes from "prop-types";
import axios from "~/utils/axios";
export class Upload extends Component {
    state={
        touxiang:"",
        title:"",
        main:""
    }
    fabu=()=>{
      console.log(this.context);

      let title = this.state.title;
      let main = this.state.main;
      let picpath = this.state.touxiang;
      let baming = this.context.props.location.query.name
      let name = this.props.name;
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour =date.getHours();
      var minute = date.getMinutes();
      minute=minute<10?"0"+minute:minute;
      var seconds = date.getSeconds();
      var time = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds;
      var who = localStorage.mobile;
      console.log(picpath);
      axios.get("/react/fatie",{params:{title,main,picpath,baming,time,who,...this.props.userInfo}})
      .then(res=>{
        this.context.props.history.push({pathname:"/balist",query:{name}})
      })
    }
    Fntitle = (e)=>{
      this.state.title = e.target.value;
      this.setState({
        title:this.state.title
      })
    }
    Fnmain = (e)=>{
      this.state.main = e.target.value;
      this.setState({
        main:this.state.main
      })
    }
  shangchuan = e => {
    let $target = e.target || e.srcElement;
    let file = $target.files[0];
    let mobile = localStorage.mobile;
    // console.log(file);
    // console.log(this.$refs.one.files[0]);

    let data = new FormData(); // 构建表单数据对象
    data.append("avatar", file); // 需要上传到 服务器 的数据
    // data.append("like",'wh1901');

    axios({
      url: "/react/upload-avatar",
      method: "POST",
      contentType: false,
      processData: false,
      data: data,
      params: {
        mobile
      }
    }).then(res => {
      console.log(res);
      this.state.touxiang  = res.data.imgUrl.replace(/public/,'http://101.132.73.191:1999');
      this.setState({
          touxiang:this.state.touxiang
      })
      console.log(this.state.touxiang)
      // localStorage.userInfo = JSON.stringify({avatar:res.data.imgUrl});
    });
  };
  
  render() {
    // console.log(this.props);
    // console.log(this.context);
    let name = this.props.name;
    return (
      <div className="upload">
        <div className="head">
          <span onClick={()=>{this.context.props.history.push({pathname:"/balist",query:{name}})}}>x</span>
          <span>发布到{name&&name}</span>
          <span onClick={this.fabu}>发布</span>
        </div>
        <div className="title">
          <input type="text" onChange={this.Fntitle} placeholder="加个标题哟~" maxLength="10" />
        </div>
        <div className="main">
          <textarea onChange={this.Fnmain} placeholder="来吧，尽情发挥吧" id="" rows="4" />
        </div>
        <div className="upload-pic">
            {
            this.state.touxiang&&
            <div className="show-pic">
                <img src={this.state.touxiang} alt=""/>
            </div>
            }
          <div className="up">
            <input
              className="pic"
              value=""
              type="file"
              accept="image/*"
              onChange={this.shangchuan}
            />
            <span className="heng" />
            <span className="shu" />
          </div>
        </div>
      </div>
    );
  }
}
Upload.contextTypes = {
  props:PropTypes.object
}