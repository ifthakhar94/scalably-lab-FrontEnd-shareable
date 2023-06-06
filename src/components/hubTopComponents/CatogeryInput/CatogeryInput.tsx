import React, { useEffect } from 'react';
import modalCommonStyles from './../hubTopModal.module.css';
import { render } from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './../../../redux/app/store';
import { setCategories } from '@/redux/features/CategoryInputSlice/categoryInputSlice';
import client from '@/GraphqlClient/client';
import { hubCategories } from '@/queries/queries';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const KeyCodes = {
  comma: 188,
  enter: 13
};
export interface Tag {
  [x: string]: string;
  id: string;
  text: string;
}
type tagProps = {
  tagLength: boolean;
  setTagLength: (value: boolean) => void;
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
export const fetched_suggestions: string[] = [];
const CatogeryInput = ({ tagLength, setTagLength }: tagProps) => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [hubCategoryList, setHubCategoryList] = React.useState<Tag[] | undefined>([]);
  const suggestions = fetched_suggestions.map((sigle_suggestion) => {
    return {
      id: sigle_suggestion,
      text: sigle_suggestion
    };
  });
  hubCategoryList?.map((category) => {
    fetched_suggestions.push(category?.name);
    // console.log(category);
  });
  useEffect(() => {
    const UserToken = window.localStorage.getItem('UserToken');

    client
      .query({
        query: hubCategories,
        variables: {
          searchWord: ''
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result) => {
        setHubCategoryList(result.data.hubCategories.hubCategoryList);
      })
      .catch((error) => {});
  }, []);
  const handleDelete = (i: any) => {
    setTags(tags?.filter((tag, index) => index !== i));
  };

  // const handleAddition = (tag: any) => {
  //   setTags([...tags, tag]);
  // };
  const handleAddition = (tag: any) => {
    setTagLength(false);
    const state = () => {
      setTagLength(true);
    };
    const categoryLength: number = tag.text.length;
    // console.log(tagLength);
    if (categoryLength > 30) {
      // console.log(categoryLength);
      state();
      console.log(tagLength);
    } else {
      console.log(tagLength);

      setTags([...tags, tag]);
      setTagLength(false);
      // console.log(tagLength);
    }
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: any) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const dispatch = useAppDispatch();

  dispatch(setCategories(tags));

  return (
    <>
      <div className={modalCommonStyles.tag_input_content}>
        <div className={modalCommonStyles.tag_input_content_inner}>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="+ 追加する"
          />
        </div>
      </div>
    </>
  );
};

export default CatogeryInput;
