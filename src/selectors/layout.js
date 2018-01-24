import createSelector from '../utils/create-selector';

const getLayout = ({ layout }) => ({
  loading: layout.loading
});

export default createSelector(
  getLayout
);
