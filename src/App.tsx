// import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/Tabs";
import TabItem from "./components/Tabs/TabItem";
import Upload from "./components/Upload/upload";
// import Transition from "./components/Transition/transition";
//FontAwesome React组件
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import Icon from "./components/Icon/icon";
library.add(fas);

function App() {
  // const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          action="https://jsonplaceholder.typicode.com/posts/"
          name="fileName"
          data={{ Key: "value" }}
          headers={{ "X-P": "hello" }}
          accept=".jpg"
          multiple
        ></Upload>
        <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"></Upload>

        {/* <FontAwesomeIcon icon={faCoffee} size="10x"></FontAwesomeIcon> */}
        <Icon icon="arrow-down" theme="primary" size="10x"></Icon>

        <Tabs defaultIndex={0} type="card">
          <TabItem label="card1">this is card one</TabItem>
          <TabItem label="card2">this is card two</TabItem>
          <TabItem label="card3">this is card three</TabItem>
        </Tabs>

        <Menu
          defaultIndex="0"
          onSelect={(index) => {
            alert(index);
          }}
          // mode="vertical"
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>

        {/* Transition组件练习 */}
        {/* <Button */}
        {/* // size={ButtonSize.Large} */}
        {/* // onClick={() => { */}
        {/* // setShow(!show); */}
        {/* // }} */}
        {/* // > */}
        {/* Toggle */}
        {/* </Button> */}
        {/* <Transition in={show} animation="zoom-in-left" timeout={300}> */}
        {/* <div> */}
        {/* <p>bhewfuhescnsahgdiuwe</p> */}
        {/* <p>bhewfuhescnsahgdiuwe</p> */}
        {/* <p>bhewfuhescnsahgdiuwe</p> */}
        {/* <p>bhewfuhescnsahgdiuwe</p> */}
        {/* <p>bhewfuhescnsahgdiuwe</p> */}
        {/* <p>bhewfuhescnsahgdiuwe</p> */}
        {/* </div> */}
        {/* </Transition> */}
        {/* <Transition in={show} animation="zoom-in-left" timeout={300} wrapper> */}
        {/* <Button>button</Button> */}
        {/* </Transition> */}

        <Button autoFocus btnType={"default"} disabled className="name">
          Disabled Button
        </Button>
        <Button autoFocus btnType={"default"} size={"lg"}>
          Large Button
        </Button>
        <Button btnType={"link"} href="http://www.baidu.com" target="_blank">
          百度link
        </Button>
        <Button autoFocus size={"sm"}>
          Small Button
        </Button>
        <Button btnType={"danger"} size={"sm"}>
          small Danger Button
        </Button>
        <Button btnType={"link"} disabled>
          Disabled Link
        </Button>
      </header>
    </div>
  );
}

export default App;
