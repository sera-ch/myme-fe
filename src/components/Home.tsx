import Header from './Header';
import List from './List'

function Home() {

    return (<>
        <Header search={ true }></Header>
        <div className='row col-12'>
            <List></List>
        </div>
    </>);
}

export default Home;