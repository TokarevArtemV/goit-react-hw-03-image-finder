import css from 'components/Filter/Filter.module.css';

export const Filter = ({ filter, onInputFilter }) => {
  return (
    <>
      <label className={css.label}>
        <span className={css.text}>Filter</span>
        <input
          className={css.input}
          type="text"
          name="filter"
          value={filter}
          onChange={onInputFilter}
        />
      </label>
    </>
  );
};
