import { Link } from 'react-router-dom'

function OptionElement({ title, route, target }) {
    return (
        <Link to={route} target={target} className="button-option-list text-xl">

            {title}

        </Link>
    );
}

export default OptionElement