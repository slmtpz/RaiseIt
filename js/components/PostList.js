import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
const posts = [
    {
        id: 1,
        rooms: 3,
        age: 4,
        type: 'satilik'
    },
    {
        id: 2,
        rooms: 30,
        age: 40,
        type: 'satilik'
    },
    {
        id: 3,
        rooms: 300,
        age: 400,
        type: 'kiralik'
    }
];

class PostList extends Component {
    
    printId(id) {
        console.log(id);
    }

	render(){
        let cards = posts.map((e, i) => (
            <Card
                key={i}
                hoverable
                title={e.type}
                style={{
                    margin: "20px 15% 20px"
                }}
                cover={<img alt="example" height={300} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                actions={[
                    <Button type="primary" onClick={() => this.printId(i)}>
                        <Icon type="edit" />
                    </Button>,
                    <Icon type="edit" />,
                    <Icon type="ellipsis" />
                ]}
            >
                <Card.Meta
                    avatar={<img alt="example" height={150} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    title={e.type}
                    description={'Oda sayisi' + e.rooms}
                />
                <div> other fields.
                    </div>
            </Card>)
        );
        console.log('cards render?');
        console.log(cards);
        return (
            <div style={{overflow: "scroll"}}>
                {cards}
            </div>
        );
	}
}

export default PostList;