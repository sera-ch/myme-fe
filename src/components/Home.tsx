import Header from './Header'
import List from './List'
import { useParams } from "react-router-dom";



function Home() {

    const { page } = useParams()

    return (<>
        <Header search={ true }></Header>
        <div className='row col-12'>
            <List page={ page || '0' }></List>
        </div>
    </>);
}

export default Home;