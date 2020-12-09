from django.http import JsonResponse
import requests
import json
import os
import music21
from pydub import AudioSegment

def api(request):
    print(request.body.decode('utf-8'))
    j = json.loads(request.body.decode('utf-8'))
    method = j['method']
    file_name = j['file'].split('.')[0]
    file = j['path']
    user = j['user']

    out_path = os.path.join('stuff',user,file_name)
    if not os.path.exists(out_path):
        os.makedirs(out_path)

    #todo
    
    res = {
        'success': True,
        'voice': '',
        'others': '',
        'pdf': '',
        'msg': ''
    }
    
    if not os.path.isfile(file):
#         print(os.listdir())
#         print(file)
        res['success'] = False
        res['msg'] = 'FILE NOT FOUND'
        return JsonResponse(res)
    
    if method in ['separate', 'both']:
        print('Separating')
        separate(file, user)
        voice = os.path.join(out_path,'vocals.mp3')
        others = os.path.join(out_path,'accompaniment.mp3')
        
        if os.path.isfile(voice) and os.path.isfile(others):
            res['voice'] = os.path.join(os.getcwd(),voice)
            res['others'] = os.path.join(os.getcwd(),others)
            
        else:
            print('fail in separate')
            res['success'] = False
            res['msg'] = 'ERROR QAQ'

    if method in ['convert', 'both']:
        print('Converting')
        if method=='both':
#             pass
            transcribe(others,out_path)
        else:
            transcribe(file, out_path)
        pdf = os.path.join(out_path, 'sheet.pdf')
        
        if os.path.isfile(pdf):
            res['pdf'] = os.path.join(os.getcwd(),pdf)
        
        else:
            print('fail in convert')
            res['success'] = False
            res['msg'] = 'ERROR QAQ'

    
    if method not in ['convert', 'both', 'separate']:
        res['success'] = False
        res['msg'] = 'UNKNOWN METHOD'
    
    print(res)
    return JsonResponse(res)

def separate(file, user):
    os.system('spleeter separate -i '+file+' -c mp3 -o stuff/'+user)
    print('Separate Done!')
    
def transcribe(file, out_path):
    if 'mp3' in file:
        audio = AudioSegment.from_file(file, "mp3")
    elif 'wav' in file:
        audio = AudioSegment.from_file(file, "wav")
        
    audio.export("../tmp/onsets-and-frames/TEST/test_flac/test.flac", format="flac")
    
    cur_dir = os.getcwd()
    os.chdir('../tmp/onsets-and-frames')
    os.system('python evaluate_all.py')
    os.chdir(cur_dir)
    
    os.system('mv ../tmp/onsets-and-frames/TEST/midi/test.flac.pred.mid '+ out_path +'/out.mid')
    midi2pdf(os.path.join(out_path,'out.mid'),os.path.join(out_path,'sheet.pdf'))
    print('Converted')
    
def midi2pdf(midi_path, pdf_path):
    print(midi_path)
    os.system(f"QT_QPA_PLATFORM='offscreen' mscore -o '{pdf_path}' '{midi_path}'")
