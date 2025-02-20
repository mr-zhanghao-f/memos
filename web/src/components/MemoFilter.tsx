import { useAppSelector } from "../store";
import { locationService, shortcutService } from "../services";
import * as utils from "../helpers/utils";
import { getTextWithMemoType } from "../helpers/filter";
import useI18n from "../hooks/useI18n";
import "../less/memo-filter.less";

const MemoFilter = () => {
  const query = useAppSelector((state) => state.location.query);
  useAppSelector((state) => state.shortcut.shortcuts);
  const { tag: tagQuery, duration, type: memoType, text: textQuery, shortcutId } = query;
  const shortcut = shortcutId ? shortcutService.getShortcutById(shortcutId) : null;
  const showFilter = Boolean(tagQuery || (duration && duration.from < duration.to) || memoType || textQuery || shortcut);
  const { t } = useI18n();

  return (
    <div className={`filter-query-container ${showFilter ? "" : "!hidden"}`}>
      <span className="tip-text">{t("common.filter")}:</span>
      <div
        className={"filter-item-container " + (shortcut ? "" : "hidden")}
        onClick={() => {
          locationService.setMemoShortcut(undefined);
        }}
      >
        <span className="icon-text">🎯</span> {shortcut?.title}
      </div>
      <div
        className={"filter-item-container " + (tagQuery ? "" : "hidden")}
        onClick={() => {
          locationService.setTagQuery(undefined);
        }}
      >
        <span className="icon-text">🏷️</span> {tagQuery}
      </div>
      <div
        className={"filter-item-container " + (memoType ? "" : "hidden")}
        onClick={() => {
          locationService.setMemoTypeQuery(undefined);
        }}
      >
        <span className="icon-text">📦</span> {getTextWithMemoType(memoType as MemoSpecType)}
      </div>
      {duration && duration.from < duration.to ? (
        <div
          className="filter-item-container"
          onClick={() => {
            locationService.setFromAndToQuery();
          }}
        >
          <span className="icon-text">🗓️</span> {utils.getDateString(duration.from)} to {utils.getDateString(duration.to)}
        </div>
      ) : null}
      <div
        className={"filter-item-container " + (textQuery ? "" : "hidden")}
        onClick={() => {
          locationService.setTextQuery("");
        }}
      >
        <span className="icon-text">🔍</span> {textQuery}
      </div>
    </div>
  );
};

export default MemoFilter;
