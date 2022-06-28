import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

export const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((c) => {
      setSubs(c.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () => {
    return subs.map((s) => (
      <Link
        to={`/sub/${s.slug}`}
        key={s._id}
        className='col btn btn-outlined-primary btn-info btn-block btn-raised m-3'
      >
        <div className=''>{s.name}</div>
      </Link>
    ));
  };

  return (
    <div className='container'>
      <div className='row'>
        {loading ? <h4 className='text-center'>Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};
