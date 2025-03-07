import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import { useState, useEffect, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	options: typeof defaultArticleState;
	onApply: (newOptions: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({
	options,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localOptions, setLocalOptions] = useState({ ...options });

	const formRef = useRef<HTMLBaseElement>(null);

	const toggleOpen = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleOptionChange =
		(key: keyof typeof defaultArticleState) => (selected: OptionType) => {
			setLocalOptions((prev) => ({ ...prev, [key]: selected }));
		};

	const handleReset = () => {
		setLocalOptions(defaultArticleState);
		onApply({ ...defaultArticleState });
	};

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(localOptions);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleApply}>
					<Select
						options={fontFamilyOptions}
						selected={localOptions.fontFamilyOption}
						onChange={handleOptionChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер'
						options={fontSizeOptions}
						selected={localOptions.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
						title='Размер'
					/>
					<Select
						options={fontColors}
						selected={localOptions.fontColor}
						onChange={handleOptionChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={localOptions.backgroundColor}
						onChange={handleOptionChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={localOptions.contentWidth}
						onChange={handleOptionChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
