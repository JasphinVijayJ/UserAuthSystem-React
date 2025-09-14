
export default function InputField({ label, type, name, value, placeholder, onChange }) {
    return (
        <>
            <label>{label}</label>

            <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} required />
        </>
    )
}
