import React from 'react';

import { sortByPriority } from '../utils';
import { BugIDLink, BugSummaryLink } from './BugLink';

const newBugHref = id =>
  `https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=DevTools&component=Debugger&blocked=${id}`;

export default function Meta({ meta, resultsMap }) {
  const deps = meta.DependsOn.split(', ');
  const openBugs = deps.map(dep => resultsMap[dep]).filter(i => i);
  const completeCount = deps.length - openBugs.length;
  const progress = `${(completeCount / deps.length) * 100}%`;

  return (
    <div className="meta">
      <div className="meta-header">
        {meta.Alias ? <div className="alias">{meta.Alias}</div> : null}
        <div className="summary">
          <BugSummaryLink bug={meta} />
        </div>
        <div className="progress">
          {completeCount} / {deps.length}
        </div>
        <a
          href="#"
          className="new-bug"
          href={newBugHref(meta.BugID)}
          target="none"
        >
          +
        </a>
      </div>
      <div>
        <div className="meta-body">
          <table className="pure-table pure-table-horizontal">
            <tbody>
              {sortByPriority(openBugs).map(bug => (
                <tr key={bug.BugID} className="dep">
                  <td width="80px" align="left">
                    <BugIDLink bug={bug} />
                  </td>
                  <td>{bug.Summary}</td>
                  <td align="right">{bug.Priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="meta-footer">
          <div className="progress-bar">
            <div className="progress" style={{ width: progress }} />
          </div>
        </div>
      </div>
    </div>
  );
}
