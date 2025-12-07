import styles from "./search-bar.module.scss";

export const SearchBar = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (query: string) => void;
}) => (
  <input
    className={styles.searchBar}
    autoFocus={true}
    placeholder={"Search"}
    type={"text"}
    value={value}
    onChange={ev => {
      onChange(ev.target.value);
    }}
  />
);
