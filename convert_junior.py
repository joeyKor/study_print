import os
import re
import json
import openpyxl

def generate_sentence(word, meaning):
    w = word.strip()
    m = meaning.strip()
    
    # Check common patterns
    if re.search(r'하다$|되다$|치다$|나다$|내다$', m):
        # Verb
        if ' ' in w:
            return f"You should {w} every day."
        return f"It is important to {w} carefully."
    elif re.search(r'의$|한$|는$|로운$|스러운$|적인$', m):
        # Adjective
        return f"This is very {w} for all of us."
    elif re.search(r'게$|히$', m):
        # Adverb
        return f"She did the work {w}."
    elif re.search(r'~', m) or ' ' in w:
        # Phrase or idiom
        return f"We can learn how to use {w}."
    else:
        # Noun / General
        return f"The {w} is very useful here."

def convert_all():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, 'assets')
    
    converted_info = []

    for num in range(129, 146):
        xlsx_name = f"junior_w_{num}_단어장.xlsx"
        xlsx_path = os.path.join(assets_dir, xlsx_name)
        
        if not os.path.exists(xlsx_path):
            print(f"File not found: {xlsx_path}")
            continue
        
        wb = openpyxl.load_workbook(xlsx_path)
        ws = wb.active
        
        data_list = []
        for row in ws.iter_rows(values_only=True):
            if not row or not any(row):
                continue
            
            # Check header
            if str(row[0]).strip() == '타이틀' or str(row[1]).strip() == '단어':
                continue
            
            if len(row) < 3:
                continue
                
            word_val = str(row[1]).strip() if row[1] is not None else ''
            mean_val = str(row[2]).strip() if row[2] is not None else ''
            
            if not word_val or word_val.lower() == 'none' or word_val.lower() == '단어':
                continue
            
            sentence_val = generate_sentence(word_val, mean_val)
            
            data_list.append({
                "word": word_val,
                "meaning": mean_val,
                "sentence": sentence_val
            })
        
        out_js_name = f"english_junior{num}.js"
        out_js_path = os.path.join(assets_dir, out_js_name)
        
        var_name = f"ENGLISH_JUNIOR{num}_DATA"
        json_str = json.dumps(data_list, ensure_ascii=False, indent=2)
        js_content = f"var {var_name} = {json_str};\n"
        
        with open(out_js_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        print(f"Converted Junior {num}: {len(data_list)} words -> {out_js_name}")
        converted_info.append((num, len(data_list)))

    print("Finished converting all junior files!")
    return converted_info

if __name__ == '__main__':
    convert_all()
