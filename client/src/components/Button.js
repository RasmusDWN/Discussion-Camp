export default function Button({ label, onClick }) {
    return (
        <button type="button" onClick={onClick} className="btn btn-secondary">
            {label}
        </button>
    );
}