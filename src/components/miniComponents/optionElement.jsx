import { Link } from 'react-router-dom'

function OptionElement({ title, route }) {
    return (
        <Link to={route} target='_blank' className="button-option-list">

            {title}

        </Link>
    );
}

export default OptionElement