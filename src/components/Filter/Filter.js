import s from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <label className={s.formField}>
    <span className={s.formLabel}>Find contacts by name</span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={s.formInput}
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
