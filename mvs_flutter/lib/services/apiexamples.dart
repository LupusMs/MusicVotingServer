import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart';
import 'package:mvs_flutter/Model/Song.dart';

Future<List<Song>> fetchSongs() async {
  Response response = await get('http://10.194.1.191:8080/api/v1/songs');
  var songs = List<Song>();
  if (response.statusCode == 200) {
    var songsJson = json.decode(response.body);
    for (var noteJson in songsJson) {
      songs.add(Song.fromJson(noteJson));
    }
  }
  return songs;
}

Future<List<List<Song>>> getSongs() async {
  try {
    Response response = await get('http://10.194.1.191:8080/api/v1/pairs');
    var songs = List<List<Song>>();
    if (response.statusCode == 200) {
      songs = songFromJson(response.body);
      return songs;
    } else {
      return List<List<Song>>();
    }
  } catch (e) {
    return List<List<Song>>();
  }
}
